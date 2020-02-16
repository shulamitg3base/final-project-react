import React from 'react';
import './category.css'

export default function Category(props) {
  return (
    <div className={`${props.category.isActive ? "active" : ''} ${props.category.style} category`}
      onClick={() => props.category.onClick(props.category.name)}>
      <i className={props.category.icon}></i>
      <span>{props.category.name}</span>
      {props.category.name === 'Inbox' ? <span className="num-of-element-in-category">{props.numOfUnreadEmails}
      </span> : null}
    </div>
  )
}