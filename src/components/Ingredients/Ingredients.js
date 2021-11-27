import React, { useCallback, useReducer } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...state, action.ingredient];
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    default:
      throw new Error("Error");
  }
};

const httpReducer = (prevState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...prevState, loading: false };
    case "ERROR":
      return { loading: false, error: action.error };
      case "CLEAR_ERROR":
        return {...prevState, error: null}
    default:
      throw new Error("Error");
  }
};

const Ingredients = () => {
  console.log("rendering ingredients");
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  //fetching of the list of ingredient in Search component

  const addIngredient = (ingredient) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      "https://ingredients-form-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        dispatchHttp({ type: "SEND" });
        return response.json();
      })
      .then((responseData) =>
        //...ingredients takes all key value
        dispatch({ type: "ADD", ingredient })
      )
      .catch((error) => {
        dispatchHttp({type: 'ERROR', error: 'Failed.'});
      });
  };

  const onFilterHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const removeIngredientHandler = (id) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://ingredients-form-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id });
      })
      .catch((error) => {
        dispatchHttp({type: 'ERROR', error: 'Failed.'});

      });
  };
  const clearError = () => {
    dispatchHttp({ type: "CLEAR_ERROR"});
  };

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

      <IngredientForm onAddIngredients={addIngredient} loading={httpState.loading} />

      <section>
        <Search onFilterIngredients={onFilterHandler} loading={httpState.loading} />
        <IngredientList
          loading={httpState.loading}
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
