import React from 'react';
// import './styles/Widget.css';

const Widget = ({ widget, categoryId, onRemove }) => {
  return (
    <div className="widget">
      <div>
        <h3>{widget.name}</h3>
        <p>{widget.text}</p>
      </div>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default Widget;
