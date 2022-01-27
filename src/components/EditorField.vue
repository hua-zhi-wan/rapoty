<template>
  <div class="container">
    <label>
      <textarea name="md-input"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"></textarea>
    </label>
  </div>
</template>

<script>
export default {
  name: "EditorField",
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<style scoped>
div {
  /* Container */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  float: left;
  height: 100vh;

  background: var(--edit-color);
  width: 50%;
}

textarea {
  outline: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8rem 1rem;
  width: 100%;
  height: 100%;
  resize: none;
  border: none;

  font-size: 1.3rem;
  font-family: var(--monospace-font-family);
  line-height: 2rem;

  background: var(--edit-color);
  color: var(--font-color);
}
</style>