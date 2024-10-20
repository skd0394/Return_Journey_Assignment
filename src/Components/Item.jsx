import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../Redux/ItemSlice';

const Item = React.memo(({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedBody, setEditedBody] = useState(item.body);
  const dispatch = useDispatch();

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/list/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedTitle, body: editedBody }),
      });
      if (response.ok) {
        dispatch(updateItem({ id: item.id, title: editedTitle, body: editedBody }));
        setIsEditing(false);
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }, [item.id, editedTitle, editedBody, dispatch]);

  const handleDelete = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/list/${item.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteItem(item.id));
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }, [item.id, dispatch]);

  const containerStyle = useMemo(() => ({
    backgroundColor: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
  }), []);

  const inputStyle = useMemo(() => ({
    marginBottom: '0.5rem',
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
  }), []);

  const textStyle = useMemo(() => ({
    marginBottom: '0.5rem',
  }), []);

  const buttonContainerStyle = useMemo(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
  }), []);

  const buttonStyle = useMemo(() => ({
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
    marginLeft: '0.5rem',
  }), []);

  const saveButtonStyle = useMemo(() => ({
    ...buttonStyle,
    backgroundColor: '#48bb78',
  }), [buttonStyle]);

  const editButtonStyle = useMemo(() => ({
    ...buttonStyle,
    backgroundColor: '#4299e1',
  }), [buttonStyle]);

  const deleteButtonStyle = useMemo(() => ({
    ...buttonStyle,
    backgroundColor: '#f56565',
  }), [buttonStyle]);

  return (
    <div style={containerStyle}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={inputStyle}
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            style={{...inputStyle, minHeight: '100px'}}
          />
        </>
      ) : (
        <>
          <h3 style={textStyle}>{item.title}</h3>
          <p style={textStyle}>{item.body}</p>
        </>
      )}
      <div style={buttonContainerStyle}>
        {isEditing ? (
          <button
            onClick={handleSave}
            style={saveButtonStyle}
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            style={editButtonStyle}
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          style={deleteButtonStyle}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default Item;
