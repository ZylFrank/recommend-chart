import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export async function getStoryAndNum() {
  return request(`${SERVER_URL}/recommend/storyAndNumber`, {
    method: 'POST',
    data: {
      userType: 1,
      rank: 1,
    },
  });
}