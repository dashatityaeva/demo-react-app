import React, { ChangeEvent, useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import st from './ProfileInfo.module.css';
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusWithHook from "./ProfileStatus/ProfileStatusWithHook";
import ProfileDataForm from "./ProfileDataForm";
import defaultImg from '../../../assets/user.jpg'
import { ContactsType, ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    isOwner: boolean
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);

    if(!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        // if(e.target.files?.length) {
        if(e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }
    return ( 
        <div>
            <div>
                <img className={st.banner} src="https://img.freepik.com/free-vector/neon-lights-background-theme_52683-44625.jpg?size=626&ext=jpg" alt="banner"></img>
            </div>
            <div>
                <img className={st.ava} src={props.profile.photos.large || defaultImg} alt="avatar"></img>
                {props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}

                {editMode 
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> 
                    : <ProfileData profile = {props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/>}
               

                {/* <ProfileStatus status={props.status} updateStatus={props.updateStatus}/> */}
                <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    isOwner: boolean
    profile: ProfileType
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return (<>
            <div >
                {props.isOwner &&  <button onClick={props.goToEditMode}>edit</button>}
            </div>
            <div>
                <b>Full name </b>{props.profile.fullName}
            </div>
            <div>
                <b>Looking for a job: </b> {props.profile.lookingForAJob ? "yea" : "nope"}
            </div>
            <div>
                {props.profile.lookingForAJob && 
                    <div>
                        Description of a job: {props.profile.lookingForAJobDescription}
                    </div>
                }
            </div>
            <div>{props.profile.aboutMe}</div>

            <div  className={st.contacts}>
                <b>Contacts: </b>{Object
                    .keys(props.profile.contacts)
                    .map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]} />
                })}
            </div>
        </>
    )
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>{contactValue}</div>
}

export default ProfileInfo;