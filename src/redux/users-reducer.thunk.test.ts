import { APIResponseType, ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { actions, follow, unfollow } from "./users-reducer";

jest.mock("./users-reducer");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;


const dispatchMock = jest.fn();
const getStatehMock = jest.fn();

const successResult: APIResponseType = {
  data: {},
  resultCode: ResultCodesEnum.Success,
  messages: []
}

usersAPIMock.unfollow.mockReturnValue(Promise.resolve(successResult));
usersAPIMock.follow.mockReturnValue(Promise.resolve(successResult));

// beforeEach(() => {
//   dispatchMock.mockClear();
//   getStatehMock.mockClear();
//   // usersAPIMock.follow.mockClear();
//   // usersAPIMock.unfollow.mockClear();
// })



test('Success follow thunk', async () => {
  // usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
  const thunk = follow(1);
  
  await thunk(dispatchMock, getStatehMock, {})
  
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});


test('Success unfollow thunk', async () => {
  // usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
  const thunk = unfollow(1);

  await thunk(dispatchMock, getStatehMock, {})

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});