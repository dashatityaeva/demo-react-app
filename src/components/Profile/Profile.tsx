import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import st from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
  isOwner: boolean
  profile: ProfileType | null
  stat: string
  updateStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
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