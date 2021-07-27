import MyPostsContainer from './MyPosts/MyPostsContainer';
import st from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return (
      <div className={st.border}>
        <ProfileInfo 
          savePhoto={props.savePhoto} 
          saveProfile={props.saveProfile}
          isOwner={props.isOwner} 
          profile={props.profile} 
          status={props.stat} 
          updateStatus={props.updateStatus}/>
        <MyPostsContainer />
     </div>
    )
} 

export default Profile;