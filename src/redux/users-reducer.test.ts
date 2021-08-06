import usersReducer, { actions, InitialStateType } from "./users-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Dima 0", status: "123", photos: {large: "", small: ""}, followed: false},
            {id: 1, name: "Dima 1", status: "123", photos: {large: "", small: ""}, followed: false},
            {id: 2, name: "Dima 2", status: "123", photos: {large: "", small: ""}, followed: true},
            {id: 3, name: "Dima 3", status: "123", photos: {large: "", small: ""}, followed: true}
        ],
        totalCount: 0,
        pageSize: 100,
        currentPageNumber: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
          term: "",
          friend: null as null | boolean
        }
      }
})


test('Following is success', () => {
  const newState = usersReducer(state, actions.followSuccess(1))
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test('Following is unsuccess', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
  });
    