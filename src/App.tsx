import React, { ComponentType, Suspense } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import 'antd/dist/antd.css';
import Preloader from './components/common/Preloader/Preloader';
import {LoginPage} from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import { initializeApp } from './redux/app-reducer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store, { AppStateType } from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';
import {UsersPage} from './components/Users/UsersContainer';
import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Header } from './components/Header/Header';


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

//lezyload React.lazy
// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'))
const ChatPage = React.lazy(() => import ('./pages/Chat/ChatPage'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType ={
  initializeApp: () => void
}

const SuspensedDialogs = withSuspense(DialogsContainer)
const SuspensedChatPage = withSuspense(ChatPage)

class App extends React.Component<MapPropsType &  DispatchPropsType> {

  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    alert('error')
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors) 
  }
  
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors) 
  }

  render() {
    if (!this.props.initialized) {return <Preloader/>}
    
    return (
      <Layout>
      <Header/>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >

              <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                <Menu.Item key="2"> <Link to="/messages">Messages</Link></Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                <Menu.Item key="5"><Link to="/devs">Devs</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/chat">Chat</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/music">Music</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/news">News</Link></Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9"><Link to="/settings">Settings</Link></Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Switch>
              <Route exact path="/" render={ () => <Redirect to={"/profile"} /> } />
              <Route exact path="/profile/:userId?" render={ () => <ProfileContainer/> } />
              {/* <Route path="/messages" render={ () => {return <Suspense fallback={<Preloader/>}><DialogsContainer /></Suspense> }} /> */}
              <Route path="/messages" render={() => <SuspensedDialogs/> } />
              <Route path="/devs" render={ () => <UsersPage pageTitle={"Our users are samurais"} /> } />
              <Route path="/login" render={ () => <LoginPage /> } />
              <Route path="/chat" render={ () => <SuspensedChatPage /> } />
              <Route path="*" render={ () => <div>404 page </div> } />
            </Switch>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Daria T ©2021</Footer>
    </Layout>



      ////////////////
      // <div className="app-wrapper">
      //   <HeaderContainer/>
      //   <Navbar/>
      //   <div className="app-wrapper-content">
      // <Switch>
      //     <Route exact path="/" render={ () => <Redirect to={"/profile"} /> } />

      //     <Route exact path="/profile/:userId?" render={ () => <ProfileContainer/> } />
  
      //     {/* <Route path="/messages" render={ () => {return <Suspense fallback={<Preloader/>}><DialogsContainer /></Suspense> }} /> */}
      //     <Route path="/messages" render={() => <SuspensedDialogs/> } />
  
      //     <Route path="/users" render={ () => <UsersPage pageTitle={"Our users are samurais"} /> } />
  
      //     <Route path="/login" render={ () => <LoginPage /> } />

      //     <Route path="*" render={ () => <div>404 page </div> } />
      // </Switch>
  
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})


let AppContainer =  compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);


const MainApp: React.FC = () => {
  return (
    <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  )
}

export default MainApp;