<template>
  <div id="side-bar">
    <div class="side-bar-container">
      <div class="side-bar-item">
        <label for="hidden-checkbox-1">
          <i class="fa fa-file-o"/>
          <span>Work Space</span>
        </label>
        <input type="checkbox" id="hidden-checkbox-1" class="hidden-checkbox" checked>
        <ul>
          <li v-for="(item,i) in opened_files" :key="i" class="file-name" @click="jumpFile(i)">
            <input-span v-model="item.fileName"></input-span>
          </li>
        </ul>
      </div>
      <div class="side-bar-item">
        <label for="hidden-checkbox-4">
          <i class="fa fa-file-code-o"></i>
          <span>Files</span>
        </label>
        <input type="checkbox" id="hidden-checkbox-4" class="hidden-checkbox" checked>
        <ul>
          <li @click="jumpFile(-1)">
            + New Empty File
          </li>
          <li v-if="isWebkit" @click="openAsNew()">
            + Open As New File
          </li>
          <li v-if="isWebkit" @click="openExplore()">
            + Open Folder
          </li>
        </ul>
      </div>
      <div class="side-bar-item">
        <label for="hidden-checkbox-2">
          <i class="fa fa-wrench"/>
          <span>Tools</span>
        </label>
        <input type="checkbox" id="hidden-checkbox-2" class="hidden-checkbox" checked>
        <ul>
          <li @click="fullScreen()">Full Screen</li>
          <li @click="saveAsHTML()">Generate HTML File</li>
          <li @click="saveAsMD()">Save As Markdown</li>
        </ul>
      </div>

      <div class="side-bar-item">
        <label for="hidden-checkbox-3">
          <i class="fa fa-info-circle"></i>
          <span>About</span>
        </label>
        <input type="checkbox" id="hidden-checkbox-3" class="hidden-checkbox" checked>
        <ul>
          <li onclick="(()=>window.open('https://github.com/HanaYabuki'))()">Find Me On Github</li>
        </ul>
      </div>

      <div class="side-bar-item">
        <label>
          <i class="fa fa-plus-circle"></i>
          <span>Ad Place</span>
        </label>
        <div class="ad-block">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputSpan from "@/components/InputSpan";

import FileGenerator from "@/utils/FileGenerator";

let counter = 1

export default {
  name: "SideBar",
  components: {InputSpan},
  props: {
    opened_files: Array,
    opened_id: Object,
    text_raw: String,
    text_output: String
  },
  setup(props) {
    return {
      fullScreen() {
        if (!document.fullscreen)
          document.documentElement.requestFullscreen()
        else
          document.exitFullscreen()
      },
      saveAsMD() {
        const file = props.opened_files[props.opened_id.value]
        FileGenerator.download(file.fileName + '.md', file.content)
      },
      saveAsHTML() {
        const file = props.opened_files[props.opened_id.value]
        FileGenerator.download(file.fileName + ".html", FileGenerator.generateHTML(props.text_output))
      },
      async openAsNew() {
        const [fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: 'Markdown-text-file',
              accept: {
                'text/md': ['.md']
              }
            },
          ],
          excludeAcceptAllOption: true
        })
        const fileName = fileHandle.name
        const fileData = await fileHandle.getFile()
        const reader = new FileReader()
        reader.readAsText(fileData)
        reader.onload = function () {
          const content = this.result
          const of = props.opened_files
          of.push({
            fileName: fileName.replace('.md', ''),
            content
          })
          const oi = props.opened_id
          oi.value = of.length - 1
        }
        reader.onerror = function (e) {
          console.log(e)
        }
      },
      async openExplore() {
        const dirHandle = await window.showDirectoryPicker()

        for await (const [key, value] of dirHandle.entries()) {
          console.log(key, value)
        }
      },
      jumpFile(i) {
        const oi = props.opened_id
        if (i === oi.value) return
        const of = props.opened_files
        if (i < 0) {
          const n = counter++
          of.push({
            fileName: "untitled" + n,
            content: "## Hello No." + n
          })
          i = n
        }
        oi.value = i
      },
      isWebkit: window.navigator.userAgent.toLowerCase().indexOf('webkit') !== -1
    }
  }
}
</script>

<style scoped>
#side-bar {
  background: var(--side-bar-color);
  width: var(--side-bar-width);
  transition: width var(--liner-timer);

  position: absolute;
  height: 100vh;

  overflow-x: hidden;
  overflow-y: auto;
}

#side-bar:hover {
  width: var(--side-bar-selected-width);
}

#side-bar > .side-bar-container {
  background: #eee;
  box-sizing: border-box;
  width: var(--side-bar-selected-width);
  display: none;
}

#side-bar:hover > .side-bar-container {
  display: block;
}

/* Side Bar Item */
.side-bar-item {
  background: var(--side-bar-color);
}

.side-bar-item * {
  color: var(--font-color);
  user-select: none;
}

.side-bar-item label {
  display: block;
  background: var(--side-bar-selected-color);
  padding: 0.6rem 0 calc(0.6rem - 1px) 1rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #ccc;
}

/* Side bar item */
.side-bar-item ul {
  margin: 0;
  padding: 0;
  height: auto;
}

.side-bar-item li {
  font-size: 1rem;
  list-style: none;
  padding: 0.4rem 0 0.4rem 3rem;
}

.side-bar-item li:hover {
  background: var(--side-bar-highlight-color);
  transition: background-color 0.1s;
}

.hidden-checkbox[type='checkbox'] {
  display: none;
}

.hidden-checkbox[type='checkbox'] ~ ul {
  transition: all var(--liner-timer);
}

.hidden-checkbox[type='checkbox'] ~ ul {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.hidden-checkbox[type='checkbox']:checked ~ ul {
  height: auto;
  opacity: 1;
}

/* File Name Event */
/* Icon */
label > i {
  padding: 0 .6rem 0 0;
  display: inline-block;
  width: 1rem;
  text-align: center;
}

/* AD Place */
.ad-block {
  height: calc(var(--side-bar-selected-width) / 8 * 5);
  background-color: #9991;
}
</style>