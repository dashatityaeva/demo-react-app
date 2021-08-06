import st from './Message.module.css'

type PropsType = {
    text: string
}

const Message: React.FC<PropsType> = (props) => {
    return <div className={st.message}>{props.text}</div>
}

export default Message;