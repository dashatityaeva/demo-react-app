import React from "react";
import st from './Post.module.css'

const Post = (props) => {
    return ( 
        <div className={st.post}>
            <img className={st.avatar} src="https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg" alt="" srcset="" />
            <p>{props.message}</p>
            <div><span>&#128525;--{props.like}</span></div>
        </div>
    )
}

export default Post;