<template>
  <div id="main">
    <div class="container left-container">
      <textarea name="md-input" id="md-input" v-model="text_raw"></textarea>
    </div>
    <div class="container right-container" v-html="text_output">
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue"
import {marked} from "marked"

function generateHTML(inner) {
  const template =
      "<!DOCTYPE>" +
      "<html>" +
      "<head>" +
      "<meta charset=\"utf-8\">" +
      "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">" +
      "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">" +
      "</head>" +
      "<body>$inner$" +
      "</body>" +
      "</html>"
  return template.replace("$inner$", inner)
}
function downloadTextFile(fileName, text){
  var aLink = document.createElement('a')
  var blob = new Blob([text])
  var evt = document.createEvent("HTMLEvents")
  evt.initEvent("click", false, false)
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.dispatchEvent(evt)
  aLink.click()
}

export default {
  name: 'App',
  components: {},
  setup() {
    const text_raw = ref("## Hello World!")
    const text_output = computed(() => marked(text_raw.value))
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        let gen_text = generateHTML(text_output.value)
        console.log(gen_text)
        downloadTextFile("mark-tool-gen.html", gen_text)
      }
    });
    return {
      render: (raw_text) => marked.parse(raw_text),
      text_raw,
      text_output
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.main {

}

#md-input {
  outline: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0.5em 1em;
  width: 100%;
  height: 100%;
  resize: none;
  border: none;

  font-size: 1.3em;
  font-family: Consolas, monospace;

  background: rgb(30, 30, 30);
  color: rgb(212, 212, 212);
}

.container {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  float: left;
  width: 50%;
  height: 100vh;
}

.left-container {
  background: rgb(30, 30, 30);
}

.right-container {
  background: #303030;
  color: rgb(212, 212, 212);
  padding: 0.5em 2em;
  line-height: 1.5em;
  font-size: 1.1em;

  font-family: Avenir, Helvetica, Arial, sans-serif;

  overflow-y: auto;
}

.right-container > * {
  color: rgb(212, 212, 212);
}
</style>
