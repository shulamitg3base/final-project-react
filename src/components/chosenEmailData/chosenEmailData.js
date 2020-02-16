import React from 'react'
import './chosenEmailData.css'

export default function ChosenEmailData(props) {

   // const [isRead,setIsRead] = useState(props.email.isRead)

    return (
        <div className="email-data">
            {props.user === props.email.receiver?
            <div onClick={()=>props.updateIsReadEmail(!props.email.isRead)} >
                {props.email.isRead ?<div> <i className="fas fa-eye"></i><span>Read</span></div> :
                <div> <i className="fas fa-eye-slash"></i><span>Unread</span></div>}
            </div>: null}
            <div onClick={()=>props.deleteEmail()}>
                <i className="fas fa-trash-alt"></i>
                <span>Trash</span>
            </div>
        </div>
    )
}