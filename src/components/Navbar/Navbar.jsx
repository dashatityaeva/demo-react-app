import { NavLink } from 'react-router-dom';
import st from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={st.nav}>
        <ul className={st.list}>
          <li className={`${st.item}`}>
            <NavLink activeClassName={st.activeLink} to="/profile">Profile</NavLink>
          </li>
          <li className={st.item}>
            <NavLink activeClassName={st.activeLink} to="/messages">Messages</NavLink>
          </li>
          <li className={st.item}>
            <NavLink activeClassName={st.activeLink} to="/news">News</NavLink>
          </li>
          <li className={st.item}>
            <NavLink activeClassName={st.activeLink} to="/music">Music</NavLink>
          </li>
          <li className={st.item}>
            <NavLink activeClassName={st.activeLink} to="/users">Users</NavLink>
          </li>
          <li className={st.item}>
            <NavLink activeClassName={st.activeLink} to="/settings">Settings</NavLink>
          </li>
        </ul>
      </nav>
    )
} 

export default Navbar;