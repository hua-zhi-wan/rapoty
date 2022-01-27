<template>
  <side-bar
      :text_output="text_output"
      :text_raw="text_raw"
      :opened_files="opened_files"
      :opened_id="opened_id"/>
  <div id="main">
    <editor-field v-model="text_raw"/>
    <renderer :inner="text_output"/>
  </div>
</template>

<script>
import {computed, reactive} from "vue"
import {marked} from 'marked'

import Renderer from "@/components/Renderer";
import EditorField from "@/components/EditorField";
import SideBar from "@/components/SideBar";

import KeyEvent from "@/utils/KeyEvent"

export default {
  name: 'App',
  components: {SideBar, EditorField, Renderer},
  setup() {
    const opened_files = reactive([{
      fileName: 'untitled',
      content: '## Hello World!\n'
    }])
    const opened_id = reactive({value: 0})

    const text_raw = computed({
      get() {
        return opened_files[opened_id.value].content
      },
      set(value) {
        opened_files[opened_id.value].content = value
      }
    })
    const text_output = computed(() => {
      return marked.parse(opened_files[opened_id.value].content)
    })

    /* Download Callback */
    KeyEvent.maskCtrlCombination('s')
    KeyEvent.maskTab()
    KeyEvent.maskCtrlCombination('q', () => {
      console.log(opened_files)
    })

    return {
      text_raw,
      text_output,
      opened_files,
      opened_id
    }
  }
}
</script>

<style>
:root {
  /* TIMER */
  --liner-timer: 0.2s;

  /* BOX SIZING */
  --side-bar-width: 2.5rem;
  --side-bar-selected-width: 15rem;

  /* COLOR */
  --side-bar-selected-color: rgb(14, 99, 156); /*rgb(51, 51, 51);*/
  --side-bar-color: rgb(37, 52, 65);
  --side-bar-highlight-color: rgb(8, 131, 215);
  --edit-color: rgb(30, 30, 30);
  --font-color: rgb(212, 212, 212);
  --renderer-color: #303030;

  /* FONT */
  --monospace-font-family: Consolas, monospace;
  --renderer-font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  padding: 0;

  /* Ban Y-direction scroll */
  overflow-y: hidden;
}

#main {
  float: none;

  position: absolute;
  margin-left: var(--side-bar-width);
  width: calc(100% - var(--side-bar-width));
  z-index: -1;
}
</style>
