import st from './Message.module.css'

const Message = (props) => {
    return <div className={st.message}>{props.text}</div>
}

export default Message;