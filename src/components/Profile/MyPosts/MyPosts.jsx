import React from "react";
import st from './MyPosts.module.css'
import Post from "./Post/Post";
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const MyPosts = (props) =>  {

  //проверка для не рендеринга компонета при старых props, state
  //это делается автоматически в PureComponent(в классовом компоненте)
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps !== this.props || nextState !== this.state;
  // }
  //или можно использовать React.memo()

  console.log("render");

    let postElements = props.posts.map(p => <Post key={p.id} message={p.post} like={p.likeCount}/>)

    let addNewPostText = (values) => {
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

let maxLength10 = maxLengthCreator(10);

const PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name="newPostText" validate={[required, maxLength10]} placeholder="type post..."/>
        <button >Add post</button>
    </form>
  )
}

const PostReduxForm = reduxForm({form: 'postNewTextForm'})(PostForm);

export default MyPosts;