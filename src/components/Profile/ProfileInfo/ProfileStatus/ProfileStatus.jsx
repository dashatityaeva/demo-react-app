import React from "react";

class ProfileStatus extends React.Component {
 
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({
            status:  e.target.value
        })
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode 
                    ? <div><span onDoubleClick={this.activateEditMode}>{this.props.status || "---"}</span></div>
                    : <div><input autoFocus={true} onBlur={this.deactivateEditMode} 
                                  onChange={this.onStatusChange}  value={this.state.status}/></div>
                }
                
            </div>
            )
    }
}

export default ProfileStatus;