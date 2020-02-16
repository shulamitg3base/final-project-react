import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import NewEmail from '../newEmail/newEmail';

export default function Email(props) {

    const [sendEmailBack, setSendEmailBack] = useState(false)

    useEffect(() => {
        setSendEmailBack(false);
    }, [props.email])

    return (
        <div>
            <div>
                <span className="email-tag">from: </span>
                <span>{props.user === props.email.sender ? props.email.sender : props.email.senderName} </span>
            </div>
            <div>
                <span className="email-tag">to: </span>
                <span>{props.user === props.email.receiver ? props.email.receiver : props.email.receiverName}</span>
            </div>
            <div>{props.email.subject}</div>
            <div>{Moment(props.email.sendingTime).format('d MMM hh:mm')}</div>
            <div>{props.email.content}</div>
            <input type="button" value={sendEmailBack ? 'cancel' : 'send'} onClick={() => setSendEmailBack(!sendEmailBack)} />
            {sendEmailBack ? <NewEmail receiver={props.user === props.email.sender ? props.email.receiver : props.email.sender}
                subject={`Re: ${props.email.subject}`} status="reply" sender={props.user} addNewEmail={props.addNewEmail}
                closeWindow={props.closeWindow}/> : null}
        </div>
    )
}