import React, { useState } from 'react';
import axios from 'axios';

function AddWidget({ categoryId, onWidgetAdded }) {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddWidget = async (e) => {
    e.preventDefault();

    if (widgetName.trim() === '' || widgetText.trim() === '') {
      alert('Please fill in both fields.');
      return;
    }

    const newWidget = {
      name: widgetName,
      text: widgetText,
    };

    try {
      const response = await axios.get(`http://localhost:3002/categories/${categoryId}`);
      const category = response.data;

      const updatedWidgets = [...category.widgets, newWidget];

      await axios.patch(`http://localhost:3002/categories/${categoryId}`, {
        widgets: updatedWidgets,
      });

      onWidgetAdded();
      setWidgetName('');
      setWidgetText('');
      setIsFormVisible(false); // Hide the form after adding the widget
    } catch (error) {
      console.error('Error adding widget:', error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="add-widget">
      <button onClick={toggleFormVisibility}>+ Add More</button>
      {isFormVisible && (
        <div>
          <h3>Add New Widget</h3>
          <form onSubmit={handleAddWidget}>
            <div>
              <label>Widget Name:</label>
              <input
                type="text"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                placeholder="Enter widget name"
              />
            </div>
            <div>
              <label>Widget Text:</label>
              <textarea
                type="text"
                value={widgetText}
                onChange={(e) => setWidgetText(e.target.value)}
                placeholder="Enter widget text"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddWidget;




