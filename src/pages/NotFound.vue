<template>
  <div>
    <h1>404</h1>
    <h2>Looks like the page you were looking for doesn't exist</h2>
  </div>
</template>

<style lang="scss" scoped>
div {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $pstr-black;

  @media (prefers-color-scheme: light) {
    background-color: white;
  }
}
h2 {
  margin: 0;
  text-align: center;
  color: $pstr-pale-blue;
}
</style>
