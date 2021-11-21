import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const [title, setEnteredTitle] = useState('');
  const [amount, setEnteredAmount] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    // setInputState((prevState) => {

    // })
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
              onChange={(event) => {
                setEnteredTitle(event.target.value);
              }}
            />{" "}
            {/* [0] - the current state, [1] - function for update */}
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(event) => {
                setEnteredAmount( event.target.value);
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
