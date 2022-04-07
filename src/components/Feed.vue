<template>
  <div>
    <div class="post">Post</div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  border-bottom: 1px solid var(--pstr-dark-gray);
  padding: 20px;

  @media (prefers-color-scheme: light) {
    border-color: var(--pstr-light-gray);
  }
}
</style>
