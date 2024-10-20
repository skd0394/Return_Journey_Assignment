import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../Redux/ItemSlice';
import Item from './Item';

const ItemList = () => {
  const dispatch = useDispatch();
  const { items, filter, currentPage, totalPages } = useSelector((state) => state.items);

  const filteredItems = useMemo(() => {
    let result = filter.length === 0 ? [...items] : items.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.body.toLowerCase().includes(filter.toLowerCase())
    );
    return result;
  }, [items, filter]);

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    maxHeight: '70vh',
    overflowY: 'auto',
    borderRadius: '0.5rem',
    backgroundColor: '#f7fafc',
    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    gap: '0.5rem',
  };

  const pageButtonStyle = {
    padding: '0.5rem 1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    backgroundColor: '#f7fafc',
    cursor: 'pointer',
  };

  const activePageButtonStyle = {
    ...pageButtonStyle,
    backgroundColor: '#4299e1',
    color: 'white',
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <>
      <div style={listStyle}>
        {filteredItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
      <div style={paginationStyle}>
        <button
          style={pageButtonStyle}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            style={currentPage === page + 1 ? activePageButtonStyle : pageButtonStyle}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button
          style={pageButtonStyle}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default React.memo(ItemList);
