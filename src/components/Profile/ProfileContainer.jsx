import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if(!userId) {
        this.props.history.push("/login");
      }
    }

    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }
  componentDidMount() {

    this.refreshProfile()
  }
  
  componentDidUpdate(prevProps, prevState) {

    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }

    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }
  
  render() {
    return <Profile {...this.props} isOwner={!this.props.match.params.userId}
            profile={this.props.profile} stat = {this.props.statusik} 
            updateStatus={this.props.updateStatus} 
            savePhoto={this.props.savePhoto} 
            saveProfile={this.props.saveProfile}/>
  }
} 

const mapStateToProps = (state) => {
  return {
     profile: state.profilePage.profile,
     statusik: state.profilePage.status,
     authUserId: state.auth.id,
     isAuth: state.auth.isAuth
  }
}



export default compose(
  connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter
)(ProfileContainer);;