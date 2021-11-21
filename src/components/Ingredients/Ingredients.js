import React, { useState } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    fetch("https://ingredients-form-default-rtdb.firebaseio.com/", {
      method: "POST",
      body: JSON.stringify({ ingredient }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (responseData) =>
          setUserIngredients((prevIngredients) => [
            ...prevIngredients,
            { id: responseData.name, ...ingredient },
          ]) //...ingredients takes all key value
      );
  };

  const removeIngredientHandler = (id) => {
    setUserIngredients((prevState) =>
      prevState.filter((ingredient) => ingredient.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredients={addIngredient} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
