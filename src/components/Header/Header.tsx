import { Col, Menu, Row, Layout, Button } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { Link } from 'react-router-dom'
import st from './Header.module.css'
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectUserLogin } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';


export type MapPropsType = {}

export const Header: React.FC<MapPropsType> = (props) => {
  
  const isAuth = useSelector(selectIsAuth)
  const nameLogin = useSelector(selectUserLogin)

  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }

  const { Header } = Layout

    return (
    <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={20}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/devs">Devs</Link></Menu.Item>
            <Menu.Item key="2">About us</Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          {isAuth 
            ? <div>
                <Avatar icon={<UserOutlined />} />
                <span className={st.nameLogin}> Hi,{nameLogin}!</span>
                <Button onClick={logoutCallback}>Logout</Button>
              </div> 
            : <Button><Link to={'/login'}>Login</Link></Button>
          }
        </Col>
      </Row>
    </Header>

        // <header className={st.header}>
        //     <img src="https://s0.rbk.ru/v6_top_pics/media/img/9/86/756006923345869.jpg" alt="логотип"/>
        //     <div className={st.loginBlock}>
                
               
        //     </div>
        // </header>
    )
} 

