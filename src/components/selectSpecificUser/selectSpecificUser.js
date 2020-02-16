import React from 'react';

export default function SelectSpecificUser(props) {

    const getUsersNames = () => {
        // let users = props.emails.map(i => props.user === i.sender ? { emailAddress: i.receiver, name: i.receiverName }
        //     : { emailAddress: i.sender, name: i.senderName })
        // users = users.filter((item, index) => users.findIndex(i => i.emailAddress === item.emailAddress) === index)
        // return users;
        return props.emails.filter((item, index) => props.emails.findIndex(i => 
            props.user === i.sender ? i.receiver === item.receiver : i.sender === item.sender) === index)
            .map(i => props.user === i.sender ? { emailAddress: i.receiver, name: i.receiverName }
              : { emailAddress: i.sender, name: i.senderName })

    }
    const handleSelectChange = event => {
        props.setSelectSpecificUser(event.target.value);
    }

    return (
        <div>
            <select onChange={handleSelectChange}>
                <option value="all">all</option>
                {getUsersNames().map(i => i ? <option key={i.emailAddress} value={i.emailAddress}>{i.name}</option> : null)}
            </select>
        </div>
    )
}
