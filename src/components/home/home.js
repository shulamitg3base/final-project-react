import React, { Component } from 'react';
import EmailsList from '../emailsList/emailsList.js';
import Email from '../email/email.js';
import CategoriesList from '../categoriesList/categoriesList.js'
import NewEmail from '../newEmail/newEmail.js';
import SelectSpecificUser from '../selectSpecificUser/selectSpecificUser.js';
import ChosenEmailData from '../chosenEmailData/chosenEmailData.js'
import './home.css'

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            emailsList: [],
            numOfUnreadEmails: 0,
            chosenEmail: null,
            categories: [
                {
                    name: 'Compose a new mail',
                    isActive: false,
                    icon: "fas fa-pencil-alt",
                    style: 'new-email-btn',
                    onClick: this.showNewEmailWindow
                },
                {
                    name: 'Inbox',
                    isActive: true,
                    icon: "fas fa-inbox",
                    style: 'regular-category',
                    onClick: this.setActiveCategory
                },
                {
                    name: 'Sent',
                    isActive: false,
                    icon: "fas fa-paper-plane",
                    style: 'regular-category',
                    onClick: this.setActiveCategory
                }
            ],
            user: 'ruthl@gmail.com',
            showNewEmailWindow: false,
            selectSpecificUser: 'all'
        }
    }

    setChosenEmail = (email) => {
        this.setState({ chosenEmail: email });
    }

    data = () => {
        console.log('aaaa');
        fetch(`http://localhost:5000/emails/${this.state.user}/${this.state.categories.find(i => i.isActive).name.toUpperCase()}`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                if (myJson.numOfUnreadEmails !== this.state.numOfUnreadEmails || JSON.stringify(myJson.emailsList) !== JSON.stringify(this.state.emailsList)) {
                    console.log('bbb')
                    this.setState({ emailsList: myJson.emailsList, numOfUnreadEmails: myJson.numOfUnreadEmails });
                }
            });
    }

    setActiveCategory = newCategoryName => {
        this.state.categories.forEach(i => i.isActive = i.name === newCategoryName ? true : false);
        this.setState({ chosenEmail: null });
        this.data();
    }
    showNewEmailWindow = () => {
        this.setState({ showNewEmailWindow: !this.state.showNewEmailWindow })
    }
    selectSpecificUser = () => {
        if (this.state.selectSpecificUser === "all") {
            return this.state.emailsList;
        }
        return this.state.emailsList.filter(i => i.receiver === this.state.selectSpecificUser ||
            i.sender === this.state.selectSpecificUser)
    }
    setSelectSpecificUser = emailAddress => {
        this.setState({ selectSpecificUser: emailAddress })
    }
    addNewEmail = newEmail => {
        fetch('http://localhost:5000/emails/newEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newEmail: newEmail
            })
        })
        this.data();
    }

    deleteEmail = () => {
        fetch('http://localhost:5000/emails/deleteEmail', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailId: this.state.chosenEmail._id
            })
        })
        this.setState({ chosenEmail: null })
        this.data();
    }

    updateIsReadEmail = isRead => {
        fetch('http://localhost:5000/emails/updateIsReadEmail', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailId: this.state.chosenEmail._id,
                isRead: isRead
            })
        })

        this.data();
      let chosenEmail = {...this.state.chosenEmail}
      chosenEmail.isRead = !chosenEmail.isRead;
      this.setState({chosenEmail:chosenEmail});
      
    }
    setShowNewEmailWindow = status=>{
this.setState({showNewEmailWindow: status})
    }

    componentWillMount() {
        this.data();
    }
    render() {
        setTimeout(() => {
            this.data();
        }, 60000);
        return (
            <div className="home-page-content">
                <div className="top-navbar">
                    <img src='../../assets/logo.png' alt="protonMail" />
                    <SelectSpecificUser user={this.state.user} emails={this.state.emailsList}
                        setSelectSpecificUser={this.setSelectSpecificUser} />
                    <span>{this.state.user}</span>
                </div>
                {/* <h3>{this.state.user}</h3> */}
                <div className="email-data-navbar">
                    {this.state.chosenEmail ? <ChosenEmailData email={this.state.chosenEmail}
                        deleteEmail={this.deleteEmail} user={this.state.user} updateIsReadEmail={this.updateIsReadEmail} />
                        : null}

                </div>
                <div className="category-list">
                    <CategoriesList categoriesList={this.state.categories}
                        numOfUnreadEmails={this.state.numOfUnreadEmails} />
                </div>
                <div className="emails-list">
                    <EmailsList emailsList={this.selectSpecificUser()} showSpecificEmail={this.setChosenEmail}
                        category={this.state.categories.find(i => i.isActive === true).name} /></div>
                <div className="specific-email">
                    {this.state.chosenEmail !== null ? <Email email={this.state.chosenEmail} addNewEmail={this.addNewEmail}
                        user={this.state.user} closeWindow={this.setShowNewEmailWindow}/> : null}</div>
                {this.state.showNewEmailWindow ? <NewEmail status="newEmail" sender={this.state.user} 
                addNewEmail={this.addNewEmail} closeWindow={this.setShowNewEmailWindow}/> : null}
            </div>
        )
    }
}