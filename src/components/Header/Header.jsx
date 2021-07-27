import { NavLink } from 'react-router-dom'
import st from './Header.module.css'

const Header = (props) => {
    return (
        <header className={st.header}>
            <img src="https://s0.rbk.ru/v6_top_pics/media/img/9/86/756006923345869.jpg" alt="логотип"/>
            <div className={st.loginBlock}>
                 {props.isAuth 
                    ? <div>
                        Hi,{props.name}!
                        <button onClick={props.logout}>Logout</button>
                      </div> 
                    : <NavLink to={'/login'}>Login</NavLink>}
               
            </div>
        </header>
    )
} 


export default Header;