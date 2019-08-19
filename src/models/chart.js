import { getStoryAndNum, getClickRate } from '@/services/chart';

export default {
  namespace: 'chart',

  state: {
    storyAndNumData: [],
    query: {},
    loading: false,
    clickRateData: [],
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
    *fetchClickRate({ payload }, { call, put }){
      yield put({
        type: 'save',
        payload: {
          loading: true,
          query: payload,
        },
      });
      const lintChart = yield call(getClickRate, payload);
      yield put({
        type: 'save',
        payload: {
          clickRateData: lintChart.result,
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
        if (pathname === '/dashboard/clickRate') {
          if (Object.keys(query).length > 0) {
            dispatch({
              type: 'fetchClickRate',
              payload: {
                ...query
              },
            })
          }
        }
      });
    },
  },
};
