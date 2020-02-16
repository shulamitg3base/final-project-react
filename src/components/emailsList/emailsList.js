import React from 'react';
import ShortEmail from '../shortEmail/shortEmail.js';

export default function EmailsList(props) {

  return (
    <div>
      {props.emailsList.map(i =>
        <div key={i._id}>
          <ShortEmail email={i} showSpecificEmail={props.showSpecificEmail} category={props.category}/>
        </div>)}
    </div>
  )
}


