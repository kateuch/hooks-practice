import React, { useState, useCallback, useReducer } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient]
      case 'DELETE':
        return state.filter(item => item.id !== action.id)
default: throw new Error('Error')
  }
}

const Ingredients = () => {
  console.log("rendering ingredients");
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [isLoading, setIsLoading] = useState(false);
  // const [userIngredients, setUserIngredients] = useState([]);
  const [error, setError] = useState(null);

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
    setIsLoading(true);
    fetch(
      "https://ingredients-form-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then(
        (responseData) =>
        //...ingredients takes all key value
        dispatch({type: 'ADD', ingredient })
          // setUserIngredients((prevIngredients) => [
          //   ...prevIngredients,
          //   { id: responseData.name, ...ingredient },
          // ])
      );
  };

  const onFilterHandler = useCallback(
    (filteredIngredients) => {
      dispatch({ type: "SET", ingredients: filteredIngredients });
      // setUserIngredients(filteredIngredients);
    }
  );

  const removeIngredientHandler = (id) => {
    setIsLoading(true);
    fetch(
      `https://ingredients-form-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setIsLoading(false);
        dispatch({type: 'DELETE', id})
        // setUserIngredients((prevState) =>
        //   prevState.filter((ingredient) => ingredient.id !== id)
        // );
      })
      .catch((err) => {
        setError('Failed! Try later');
        setIsLoading(false);
      });
  };
  const clearError = () => {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ ErrorModal>}

      <IngredientForm onAddIngredients={addIngredient} loading={isLoading} />

      <section>
        <Search onFilterIngredients={onFilterHandler} loading={isLoading} />
        <IngredientList
          loading={isLoading}
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
