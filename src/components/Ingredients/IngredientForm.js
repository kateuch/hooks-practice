import React, { useState } from "react";
import LoadingIndicator from '../UI/LoadingIndicator';
import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  console.log('rendering form')
  const [title, setEnteredTitle] = useState('');
  const [amount, setEnteredAmount] = useState('');
  const [formIsActive, setFormIsActive] = useState(true)

  const onChangeTitle = (event) => {
    if (event.target.value.trim() !==0) {
      setFormIsActive(false);
      setEnteredTitle(event.target.value);
    } else {
      return;
    }
  }

  const onChangeAmount = (event) => {
    if (event.target.value.trim() !== 0) {
      setFormIsActive(false);
      setEnteredAmount(event.target.value);
    } else {
      return;
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (title.trim().length && amount.trim().length) {


    props.onAddIngredients({title, amount}) //title:title

    setEnteredTitle('');
    setEnteredAmount('');
    } else {
      console.log('emty fields')
    }
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={onChangeTitle}
            />{" "}
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={onChangeAmount}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit" disabled={formIsActive} >Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
