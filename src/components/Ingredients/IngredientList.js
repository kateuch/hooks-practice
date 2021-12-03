import React from 'react';
import LoadingIndicator from '../UI/LoadingIndicator';

import './IngredientList.css';

const IngredientList = props => {  //React.memo also possible to use
  console.log('ingr list render')
  return (

    <section className="ingredient-list">

      <h2>Loaded Ingredients</h2>
      {props.loading ? <span>Loading...</span> :
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
}
    </section>
  );
};

export default IngredientList;
