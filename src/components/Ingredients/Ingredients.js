import React, { useState, useCallback } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

const Ingredients = () => {
  console.log('rendering ingredients')
  const [userIngredients, setUserIngredients] = useState([]);

//fetching of the list of ingredient in Search component

  // useEffect(() => {
  //   fetch("https://ingredients-form-default-rtdb.firebaseio.com/ingredients.json").then(response=>response.json())
  //     .then(responseData => {
  //     const loadedIngredients =[];
  //     for (const key in responseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       });
  //     };
  //    setUserIngredients(loadedIngredients);
  //     });
  //   }, [])  //it runs only once, after the first render


  const addIngredient = (ingredient) => {
    fetch("https://ingredients-form-default-rtdb.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify( ingredient ),
      headers: { 'Content-Type': 'application/json' }
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

  const onFilterHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients)
  }, [setUserIngredients])

  const removeIngredientHandler = (id) => {
    setUserIngredients((prevState) =>
      prevState.filter((ingredient) => ingredient.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredients={addIngredient} />

      <section>
        <Search onFilterIngredients={onFilterHandler}/>
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
