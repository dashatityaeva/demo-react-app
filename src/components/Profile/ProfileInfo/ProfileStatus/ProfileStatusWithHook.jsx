import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ProfileStatusWithHook = (props) => {
    //деструктуризация массива
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }

    return (
        <div>
            {
               !editMode
                ? <div><span onDoubleClick={activateEditMode}>{props.status || "---"}</span></div>
                : <div><input autoFocus={true} onBlur={deactivateEditMode}  
                              value={status}  onChange={onStatusChange} /></div>
            }
        </div>
    )
}

export default ProfileStatusWithHook;