import Vue from 'vue';
import Router from 'vue-router';

import Index from '@views/Index';

Vue.use(Router);

const router = new Router({
    base: '',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
    ],
});

export default router;
