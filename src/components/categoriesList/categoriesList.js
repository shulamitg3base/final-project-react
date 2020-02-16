import React from 'react';
import Category from '../category/category.js';

export default function CategoriesList(props) {

  return (
    <div>
      {props.categoriesList.map(i =>
        <div key={i.name}>
          <Category category={i} numOfUnreadEmails={props.numOfUnreadEmails} />
        </div>)}
    </div>
  )
}
