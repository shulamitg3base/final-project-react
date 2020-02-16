import React from 'react';
import Moment from 'moment';
import './shortEmail.css'

export default function ShortEmail(props) {
    return (
        <div onClick={() => props.showSpecificEmail(props.email)} className={`${!props.email.isRead & props.category === "Inbox" ?
            'unRead' : ''} short-email`}>
            <div>{props.category === "Sent" ? props.email.receiverName : props.email.senderName}</div>
            <div>{props.email.subject}</div>
            <div>{new Date().getDate() === new Date(props.email.sendingTime).getDate() ?
                Moment(props.email.sendingTime).format('hh: mm') : Moment(props.email.sendingTime).format('d MMM')}
            </div>
        </div>
    )
}