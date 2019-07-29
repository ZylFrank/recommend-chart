import { getStoryAndNum } from '@/services/chart';

export default {
  namespace: 'chart',

  state: {
    storyAndNumData: [],
  },

  effects: {
    *fetchStory(_, { call, put }) {
      const response = yield call(getStoryAndNum);
      yield put({
        type: 'save',
        payload: {
          storyAndNumData: response.result,
        },
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  // subscriptions: {
  //   setup({ history }) {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     return history.listen(({ pathname, search }) => {
  //       if (typeof window.ga !== 'undefined') {
  //         window.ga('send', 'pageview', pathname + search);
  //       }
  //     });
  //   },
  // },
};
