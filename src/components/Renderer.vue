<template>
  <div id="marked-renderer" v-html="inner">
  </div>
</template>

<script>
export default {
  name: "Renderer",
  props: {
    inner: String
  },
  setup() {
    return {
    }
  }
}
</script>

<style>
#marked-renderer {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  float: left;
  height: 100vh;
}

#marked-renderer {
  /* Box Sizing */
  padding: 0.5rem 2rem;
  width: 50%;

  /* Coloring */
  background: var(--renderer-color);
  color: var(--font-color);
  line-height: 1.5rem;
  font-size: 1.1rem;

  /* Font */
  font-family: var(--renderer-font-family);

  /* Display */
  overflow-y: auto;
  overflow-x: visible;
}
#marked-renderer * {
  color: var(--font-color);
}
#marked-renderer code {
  font-family: var(--monospace-font-family);
}
#marked-renderer blockquote {
  margin-left: 1rem; margin-right: 0;
  padding-left: 1rem;
  border-left: 2px solid #eee;
}
#marked-renderer ol,ul {
  padding-inline-start: 2rem;
}
#marked-renderer table {
  border-collapse: collapse;
  border-top: 2px solid var(--font-color);
  border-bottom: 2px solid var(--font-color);
}
#marked-renderer tr {
  border-top: 1px solid var(--font-color);
}
#marked-renderer th,td {
  padding: 4px 2rem;
}
</style>