import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import st from './ProfileInfo.module.css';
import { Field, reduxForm } from 'redux-form'
import s from './../../common/FormsControls/FormsControls.module.css'

const ProfileDataForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                {<button>save</button>}
            </div>
            {props.error &&  <div className={s.formCommonError}>{props.error}</div>}
            <div>
                <b>Full name </b>{createField("full name", Input, [], "fullName" )}
            </div>
            <div>
                <b>Looking for a job: </b> {createField("", Input, [], "lookingForAJob", {type: "checkbox"} )}
            </div>
            <div>
                <div>
                    Description of a job: 
                    {createField("Description of a job...", Textarea, [], "lookingForAJobDescription" )}
                </div>
            </div>
            <div>{createField("about Me...", Input, [], "aboutMe")}</div>

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

const ProfileDataFormRedux = reduxForm({form: 'profileDataForm'})(ProfileDataForm);

export default ProfileDataFormRedux;