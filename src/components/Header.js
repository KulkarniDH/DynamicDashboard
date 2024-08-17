import React from 'react';

const Header = ({ searchTerm, setSearchTerm, toggleAddWidgetMode, isAddWidgetMode }) => {
  return (
    <header className="header">
      <h1>CNAPP Dashboard</h1>
      <input
        type="text"
        placeholder="Search widget..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={toggleAddWidgetMode}>
        {isAddWidgetMode ? 'Cancel Add Widget' : 'Add Widget'}
      </button>
    </header>
  );
};

export default Header;







