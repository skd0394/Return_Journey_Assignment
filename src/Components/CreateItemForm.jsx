import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../Redux/ItemSlice';

const CreateItemForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
    };

    try {
      const response = await fetch('http://localhost:3001/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      console.log(response);
      if (response.ok) {
        const updatedList = await fetch('http://localhost:3001/list').then(res => res.json());
        console.log(updatedList);
        dispatch(setItems([...updatedList]));
        setTitle('');
        setBody('');
      }
    } catch (error) {
      console.error('Error creating new item:', error);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    fontSize: '1rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        style={inputStyle}
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter body"
        style={{ ...inputStyle, minHeight: '100px' }}
        required
      />
      <button type="submit" style={buttonStyle}>
        Create Item
      </button>
    </form>
  );
};

export default CreateItemForm;
