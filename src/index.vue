<template>
    <ScrollBar class="v-main-scroll">
        <router-view />
    </ScrollBar>
</template>
<script>
import '@styles/main.less';
import '@styles/dark.less';
import 'view-design/dist/styles/iview.css';
import ScrollBar from '@components/ScrollBar';
export default {
    name: 'index',
    components: {
        ScrollBar,
    },
};
</script>
