import React, { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../hooks/http";
import "./Search.css";

const Search = React.memo((props) => {
  const { onFilterIngredients } = props;
  const [enteredFilter, setInteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    //the first render this does execute

    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        console.log("rendering filter");
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&startAt="${enteredFilter}"&endtAt="${enteredFilter}"&print=pretty`;
        sendRequest(
          "https://ingredients-form-default-rtdb.firebaseio.com/ingredients.json" +
            query,
          "GET"
        );
      }
    }, 500);
    return () => {
      //the first render this does not execute
      clearTimeout(timer);
    };
  }, [enteredFilter, sendRequest, inputRef]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onFilterIngredients(loadedIngredients);
    }
  }, [isLoading, error, data, onFilterIngredients]);

  const onChangeFilter = (event) => {
    setInteredFilter(event.target.value);
  };
  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={onChangeFilter}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
