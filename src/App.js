import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import AddWidget from './components/AddWidget';
import axios from 'axios';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddWidgetMode, setIsAddWidgetMode] = useState(false);

  useEffect(() => {
    // Fetch categories from the JSON server on initial load
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3002/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleWidgetAdded = async () => {
    try {
      const response = await axios.get('http://localhost:3002/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching updated categories:', error);
    }
  };

  const handleDeleteWidget = async (categoryId, widgetIndex) => {
    try {
      const response = await axios.get(`http://localhost:3002/categories/${categoryId}`);
      const category = response.data;

      const updatedWidgets = category.widgets.filter((_, index) => index !== widgetIndex);

      await axios.patch(`http://localhost:3002/categories/${categoryId}`, {
        widgets: updatedWidgets,
      });

      handleWidgetAdded(); // Refresh the categories after deletion
    } catch (error) {
      console.error('Error deleting widget:', error);
    }
  };

  const toggleAddWidgetMode = () => {
    setIsAddWidgetMode(!isAddWidgetMode);
  };

  // Filter widgets based on search term, but keep all categories visible
  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="App">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleAddWidgetMode={toggleAddWidgetMode}
        isAddWidgetMode={isAddWidgetMode}
      />
     
      {filteredCategories.map((category) => (
        <div className="category" key={category.id}>
          <h2>{category.name}</h2>
          <div className="widgets">
            {category.widgets.map((widget, index) => (
              <div className="widget" key={index}>
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
                {isAddWidgetMode && (
                  <button onClick={() => handleDeleteWidget(category.id, index)}>Delete Widget</button>
                )}
              </div>
            ))}
          </div>
          <AddWidget categoryId={category.id} onWidgetAdded={handleWidgetAdded} />
        </div>
      ))}
    </div>
  );
};

export default App;
