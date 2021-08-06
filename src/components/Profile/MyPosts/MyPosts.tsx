import React from "react";
import { PostType } from "../../../types/types";
import st from './MyPosts.module.css'
import Post from "./Post/Post";
import PostReduxForm, { PostFormValuesType } from "./PostForm/PostForm";


export type MapPropsType = {
  posts: Array<PostType>
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

type PropsType = MapPropsType & DispatchPropsType

const MyPosts: React.FC<PropsType> = (props) =>  {

  //проверка для не рендеринга компонета при старых props, state
  //это делается автоматически в PureComponent(в классовом компоненте)
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps !== this.props || nextState !== this.state;
  // }
  //или можно использовать React.memo()

  let postElements = props.posts.map(p => <Post key={p.id} message={p.post} like={p.likeCount}/>)

  let addNewPostText = (values: PostFormValuesType) => {
    let newPostText = values.newPostText;
    props.addPost(newPostText);
  }

  return (
    <div>
      <div>
        My posts
        <PostReduxForm onSubmit={addNewPostText}/>
      </div>
      <div className={st.posts}>
        {postElements}
      </div>
    </div>
  )

}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized;