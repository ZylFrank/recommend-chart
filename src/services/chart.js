import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export async function getStoryAndNum(params) {
  return request(`${SERVER_URL}/recommend/storyAndNumber`, {
    method: 'POST',
    data: params,
  });
}