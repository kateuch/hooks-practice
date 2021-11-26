import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const {onFilterIngredients} = props;
  const [enteredFilter, setInteredFilter] = useState();


  useEffect(()=>{

    const query = enteredFilter.length === 0
    ? ''
    : `?orderBy='title'&equalTo='{enteredFilter}'`;
    fetch("https://ingredients-form-default-rtdb.firebaseio.com/ingredients.json" + query).then(response=>response.json())
      .then(responseData => {
      const loadedIngredients =[];
      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        });
      };
     props.onFilterIngredients(loadedIngredients)
      });
  }, [enteredFilter, onFilterIngredients])

  const onChangeFilter = (event) => {
      setInteredFilter(event.target.value)
  }
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={onChangeFilter}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
