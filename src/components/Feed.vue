<template>
    <div>
        <div class="post">Post</div>
    </div>
</template>

<style lang="scss" scoped>
.post {
    border: 1px solid #323b43;
    border-left: none;
    border-right: none;
    padding: 20px;

    @media (prefers-color-scheme: light) {
        border-color: #edf1f2;
    }
}
</style>
