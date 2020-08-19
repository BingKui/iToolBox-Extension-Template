import Vue from 'vue';
import Vuex from 'vuex';

import ext from './modules/ext';

Vue.use(Vuex);

const vuexStore = new Vuex.Store({
    modules: {
        ext,
    },
});

export default vuexStore;
