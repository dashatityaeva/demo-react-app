import { reduxForm, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, required } from "../../../../utils/validators/validators"
import { createField, GetStringKeys, Textarea } from "../../../common/FormsControls/FormsControls"

let maxLength10 = maxLengthCreator(10);

type PropsType = {

}

export type PostFormValuesType = {
    newPostText: string
}

type PostFormValuesTypeKeys = GetStringKeys<PostFormValuesType>

const PostForm: React.FC<InjectedFormProps<PostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        {/* <Field component={Textarea} name="newPostText" validate={[required, maxLength10]} placeholder="type post..."/> */}
        {createField<PostFormValuesTypeKeys>("type post...", Textarea, [required, maxLength10], "newPostText")}
        <button >Add post</button>
    </form>
  )
}

export default reduxForm<PostFormValuesType, PropsType>({form: 'postNewTextForm'})(PostForm);

