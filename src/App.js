import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

//lezyload React.lazy
// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'))


class App extends React.Component {

  catchAllUnhandleErrors = (promiseRejectionEvent) => {
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
      <div className="app-wrapper">
        <HeaderContainer/>
        <Navbar/>
        <div className="app-wrapper-content">
      <Switch>
          <Route exact path="/" render={ () => <Redirect to={"/profile"} /> } />

          <Route exact path="/profile/:userId?" render={ () => <ProfileContainer/> } />
  
          {/* <Route path="/messages" render={ () => {return <Suspense fallback={<Preloader/>}><DialogsContainer /></Suspense> }} /> */}
          <Route path="/messages" render={withSuspense(DialogsContainer)} />
  
          <Route path="/users" render={ () => <UsersContainer /> } />
  
          <Route path="/login" render={ () => <Login /> } />

          <Route path="*" render={ () => <div>404 page</div> } />
      </Switch>
  
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})


let AppContainer =  compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);


const MainApp = (props) => {
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