import Vue from 'vue';
import Tpl from './index.vue';
import store from '@store';
import router from '@router';

new Vue({
    router,
    store,
    render: h => h(Tpl),
}).$mount('#app');
