<template>
  <div>
    <div class="post">
      <span class="username">@possas</span>
      <span class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae massa est. Curabitur euismod quam id sapien volutpat iaculis. Integer.</span>
      <div class="actions">
        <i tabindex="0" class="fas fa-retweet repost"></i>
        <i tabindex="0" class="fa-solid fa-quote-right quote"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  span {
    margin-bottom: 16px;
  }

  .username {
    color: #6b7682;
  }

  .content {
    text-align: start
  }

  i {
    font-size: 20px;
    cursor: pointer;
  }

  .repost {
    padding-right: 15px;
    &:hover {
      color: $pstr-blue;
    }
  }

  .quote:hover {
    color: $pstr-green;
  }

  @include border-bottom;
}
</style>
