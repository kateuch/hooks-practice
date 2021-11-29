import React, { useCallback, useReducer, useMemo, useEffect } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../hooks/http";

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

const Ingredients = () => {
  console.log("rendering ingredients");

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  //fetching of the list of ingredient in Search component

  const { isLoading, data, error, sendRequest, reqExtra, reqIdentifer, clear } =
    useHttp;

  //updating Ingredients component
  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === "DELETE") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === "ADD") {
      dispatch({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const addIngredient = useCallback((ingredient) => {
    sendRequest(
      "https://ingredients-form-default-rtdb.firebaseio.com/ingredients.json",
      "POST",
      JSON.stringify(ingredient),
      "ADD"
    );
  }, []);

  const onFilterHandler = useCallback(
    (filteredIngredients) => {
      dispatch({ type: "SET", ingredients: filteredIngredients });
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (id) => {
      sendRequest(
        `https://ingredients-form-default-rtdb.firebaseio.com/ingredients/${id}.json`,
        "DELETE",
        null,
        id,
        "DELETE"
      );
    },
    [sendRequest]
  );

  const clearError = useCallback(() => {
    clear();
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        loading={isLoading}
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredients={addIngredient} loading={isLoading} />

      <section>
        <Search onFilterIngredients={onFilterHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
