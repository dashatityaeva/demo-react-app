import { Redirect } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import st from './Dialogs.module.css'
import Message from './Message/Message';
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { createField, Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { InitialStateType } from '../../redux/dialogs-reducer';

type OwnPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
export type NewMessageFormType = {
    newMessageBody: string
}

type NewMessageFormTypeKeys = Extract<keyof NewMessageFormType, string>

const Dialogs: React.FC<OwnPropsType> = (props) => {

    let state = props.dialogsPage;
    let dialogElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
    let messageElements = state.messages.map(m =>  <Message text={m.text}/>);

    let addNewMessage = (values: NewMessageFormType) => {
        let messageText = values.newMessageBody; //в объекте values сидят элементы формы, т.е. newMessageBody
        props.sendMessage(messageText);
    }

    return (
        <div className={st.dialogs}>
            <div className={st.dialogsItems}>
                {dialogElements}
            </div>
            <div className={st.messages}>
                <div>
                    {messageElements}
                </div>
                <MessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
} 

let maxLength15 = maxLengthCreator(15);

type PropsType = {}

const MessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NewMessageFormTypeKeys>("Type your message", Textarea, [required, maxLength15], "newMessageBody")}
            {/* <Field name="newMessageBody" component={Textarea} validate={[required, maxLength15]} placeholder="Type your message"/> */}
            <button>Send</button>
        </form>
    )
}

const MessageReduxForm = reduxForm<NewMessageFormType>({form: 'dialogsNewMessage'})(MessageForm);

export default Dialogs;