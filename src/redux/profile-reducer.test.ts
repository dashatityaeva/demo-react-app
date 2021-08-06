import profileReducer, { actions } from "./profile-reducer";

let state =  {
    posts: [
        {id: 1, post: "Hi", likeCount:11},
        {id: 2, post: "Hi", likeCount:121},
        {id: 3, post: "lalal", likeCount:111},
        {id: 4, post: "lalal", likeCount:111}
    ],
    status: '',
    profile: null,
};

it('length of posts should be incremented', () => {
    let action = actions.addPostActionCreater('text of post');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
});

it('text of posts should be "text of post"', () => {
    let action = actions.addPostActionCreater('text of post');
    let newState = profileReducer(state, action);
    expect(newState.posts[4].post).toBe('text of post');
});

it('after deleting length should be decrement', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});

it('after deleting length shouldn`t be decrement if id isn`t correct', () => {
    let action = actions.deletePost(100);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
}) 