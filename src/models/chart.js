import { getStoryAndNum } from '@/services/chart';

export default {
  namespace: 'chart',

  state: {
    storyAndNumData: [],
    query: {},
    loading: false,
  },

  effects: {
    *fetchStory({ payload }, { call, put }) {
      const { query } = payload;
      yield put({
        type: 'save',
        payload: {
          query,
          loading: true,
        },
      })
      const response = yield call(getStoryAndNum, query);
      yield put({
        type: 'save',
        payload: {
          storyAndNumData: response.result,
          loading: false,
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

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/dashboard/analysis') {
          dispatch({
            type: 'fetchStory',
            payload: {
              query
            },
          })
        }
      });
    },
  },
};
