import st from './Users.module.css'
import defaultImg from '../../assets/user.jpg'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType ={
  user: UserType
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {

    return (
    <div className={st.userItem}>
      <div>
          <NavLink to={"/profile/" + user.id}>
            <img alt="avatar" className={st.userImg} src={user.photos.large !== null ? user.photos.large : defaultImg}/> 
          </NavLink>

          {
            user.followed
              ? <button disabled={followingInProgress.some(id => id === user.id)} 
                  onClick={() => {unfollow(user.id);}}>Unfollow</button>

              : <button disabled={followingInProgress.some(id => id === user.id)} 
                  onClick={() => {follow(user.id);}}>Follow</button>
          }

      </div>
      <div className={st.userInfo}>
        <div>
          <p>{user.name}</p>
          <p>{user.status !== null ? user.status : 'Статус не установлен'}</p>
        </div>
        <div>
          <address>
            <span>{"user.location.country"}
            </span>
            <span>{"user.location.city"}</span>
          </address>
        </div>
      </div>
    </div>
    )
}

export default User;