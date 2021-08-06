import { createField, GetStringKeys, Input, Textarea } from "../../common/FormsControls/FormsControls";
import st from './ProfileInfo.module.css';
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import s from './../../common/FormsControls/FormsControls.module.css'
import { ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                {<button>save</button>}
            </div>
            {props.error &&  <div className={s.formCommonError}>{props.error}</div>}
            <div>
                <b>Full name </b>{createField<ProfileTypeKeys>("full name", Input, [], "fullName" )}
            </div>
            <div>
                <b>Looking for a job: </b> {createField<ProfileTypeKeys>("", Input, [], "lookingForAJob", {type: "checkbox"} )}
            </div>
            <div>
                <div>
                    Description of a job: 
                    {createField<ProfileTypeKeys>("Description of a job...", Textarea, [], "lookingForAJobDescription" )}
                </div>
            </div>
            <div>{createField<ProfileTypeKeys>("about Me...", Input, [], "aboutMe")}</div>

            <div>
                <b>Contacts: </b>{Object.keys(props.profile.contacts).map(key => {
                    return <div key={key} className={st.contacts}>
                        <b>{key}: {createField(key, Input, [], "contacts."+key )}</b>
                    </div>
                })}
            </div>
        </form>
    )
}

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({form: 'profileDataForm'})(ProfileDataForm);

export default ProfileDataFormRedux;