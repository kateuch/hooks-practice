import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onFilterIngredients } = props;
  const [enteredFilter, setInteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => { //the first render this does execute
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        console.log("rendering filter");
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&startAt="${enteredFilter}"&endtAt="${enteredFilter}"&print=pretty`;
        fetch(
          "https://ingredients-form-default-rtdb.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onFilterIngredients(loadedIngredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    } //the first render this does not execute
  }, [enteredFilter, onFilterIngredients, inputRef]);

  const onChangeFilter = (event) => {
    setInteredFilter(event.target.value);
  };
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
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
