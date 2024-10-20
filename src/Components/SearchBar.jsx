import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../Redux/ItemSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search items..."
      onChange={handleChange}
  />
);
};

export default SearchBar;
