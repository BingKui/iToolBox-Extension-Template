import { TEST_ACTION } from '@store/mutationType';
const plugin = {
    state: {
        count: 0,
    },
    mutations: {
        TEST_ACTION: (state, count) => {
            Object.assign(state, {
                count,
            });
        },
    },
    actions: {
        setCount: ({ commit }, count) => {
            commit(TEST_ACTION, count);
        },
    },
};

export default plugin;
