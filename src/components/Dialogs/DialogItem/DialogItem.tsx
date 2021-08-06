import { NavLink } from 'react-router-dom'
import st from './DialogItem.module.css'

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = props.id;

    return (
        <div className={st.dialog + ' ' + st.dialogActive}>
            <NavLink to={`/messages/${path}`}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;