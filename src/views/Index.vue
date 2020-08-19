<template>
    <div class="v-index-page">
        <div class="desc">本项目为模板项目，主要包含基本的框架。可以零基础直接进行插件的开发。</div>
    </div>
</template>

<script>
export default {
    name: 'Index',
};
</script>

<style lang="less">
.v-index-page {
    .p(@gap-md);
    .desc {
        .font-size();
        color: @text-color;
        text-indent: @font-size * 2;
    }
}
</style>
