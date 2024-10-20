import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setTotalPages } from './Redux/ItemSlice';
import SearchBar from './Components/SearchBar';
import ItemList from './Components/ItemList';
import CreateItemForm from './Components/CreateItemForm';

const App = () => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector((state) => state.items);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/list?_page=${currentPage}&_limit=${itemsPerPage}`);
      const data = await response.json();
      const totalCount = response.headers.get('X-Total-Count');
      const totalPages = Math.ceil(totalCount / itemsPerPage);
      
      dispatch(setItems(data));
      dispatch(setTotalPages(totalPages));
    };
    fetchData();
  }, [dispatch, currentPage, itemsPerPage]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e6f2ff, #f0e6ff)'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '48rem',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  };

  const titleStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2d3748'
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const listContainerStyle = {
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '0.5rem'
  };

  const buttonStyle = {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    alignSelf: 'flex-end'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Item Filter</h1>
        <div style={contentStyle}>
          <SearchBar />
          <button 
            style={buttonStyle} 
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : 'Create New Item'}
          </button>
          {showCreateForm && <CreateItemForm />}
          <div style={listContainerStyle}>
            <ItemList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
