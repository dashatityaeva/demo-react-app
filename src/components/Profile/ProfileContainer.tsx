import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType ) => Promise<any>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if(!userId) {
        this.props.history.push("/login");
      }
    }

    if(!userId) {
      console.error("ID should exists in URI params or in state ('authUserId')")
    } else {
      this.props.getProfile(userId);
      this.props.getStatus(userId);
    }

  }

  componentDidMount() {
    this.refreshProfile()
  }
  
  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {

    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }

    // if (prevProps.status !== this.props.status) {
    //   this.setState({
    //     status: this.props.status
    //   })
    // }
  }
  
  render() {
    return <Profile {...this.props} isOwner={!this.props.match.params.userId}
            profile={this.props.profile} stat = {this.props.statusik} 
            updateStatus={this.props.updateStatus} 
            savePhoto={this.props.savePhoto} 
            saveProfile={this.props.saveProfile}/>
  }
} 

const mapStateToProps = (state: AppStateType) => {
  return {
     profile: state.profilePage.profile,
     statusik: state.profilePage.status,
     authUserId: state.auth.id,
     isAuth: state.auth.isAuth
  }
}



export default compose<React.ComponentType>(
  connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter
)(ProfileContainer);;