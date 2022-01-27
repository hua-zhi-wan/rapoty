<template>
  <span v-if="!editable" @dblclick="editable=true">
    {{ modelValue }}
  </span>
  <input
      v-else
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focusout="editable=false" @keyup.enter="editable=false">
</template>

<script>
import {ref} from 'vue'

export default {
  name: "InputSpan",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup() {
    const editable = ref(false)
    return {
      editable
    }
  }
}
</script>

<style scoped>
* {
  display: inline-block;
  height: 1.2rem;
}
input {

  font-size: 0.9rem;
  font-family: var(--monospace-font-family);
  box-sizing: border-box;
  border: none;

  background: var(--renderer-color);
}
</style>