import React, { Component } from 'react';

export default class NewEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newEmail: {
                receiver: "",
                subject: "",
                content: "",
                sender: "",
                sendingTime: "",
                isRead: false
            }
        }
    }

    sendEmail = () => {
        let newEmailInfo = { ...this.state.newEmail }
        if (this.props.status === "reply") {
            newEmailInfo.receiver = this.props.receiver;
            newEmailInfo.subject = this.props.subject;
        }
        newEmailInfo.sendingTime = new Date();
        newEmailInfo.sender = this.props.sender;
        this.setState({ newEmail: newEmailInfo },()=>
        {this.props.addNewEmail(this.state.newEmail);
        this.props.closeWindow(false)});
    }
    setReceiver = event => {
        let newEmail = { ...this.state.newEmail }
        newEmail.receiver = event.target.value;
        this.setState({ newEmail: newEmail })
    }
    setSubject = event => {
        let newEmail = { ...this.state.newEmail }
        newEmail.subject = event.target.value;
        this.setState({ newEmail: newEmail })
    }
    setContent = event => {
        let newEmail = { ...this.state.newEmail }
        newEmail.content = event.target.value;
        this.setState({ newEmail: newEmail })
    }
    render() {
        return (
            <div>
                <form>
                    {this.props.status === "newEmail" ? <input type="text" placeholder="to" onChange={this.setReceiver} /> : null}
                    {this.props.status === "newEmail" ? <input type="text" placeholder="subject" onChange={this.setSubject} /> : null}
                    <textarea onChange={this.setContent} />
                    <input type="button" value="send" onClick={() => this.sendEmail()} />
                </form>
            </div>
        )
    }
}