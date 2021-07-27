import { NavLink } from 'react-router-dom'
import st from './DialogItem.module.css'

const DialogItem = (props) => {
    let path = props.id;

    return (
        <div className={st.dialog + ' ' + st.dialogActive}>
            <NavLink to={`/messages/${path}`}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;