import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, addWidget, removeWidget } from '../redux/widgetsSlice';
import Widget from './Widget';
// import './styles/Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.widgets.categories);
  const status = useSelector(state => state.widgets.status);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleAddWidget = () => {
    if (selectedCategory && widgetName && widgetText) {
      const newWidget = {
        id: Date.now(),
        name: widgetName,
        text: widgetText,
      };
      dispatch(addWidget({ categoryId: selectedCategory, widget: newWidget }));
      setWidgetName('');
      setWidgetText('');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search widgets..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      {categories.map(category => (
        <div className="category" key={category.id}>
          <h2>{category.name}</h2>
          {category.widgets
            .filter(widget => widget.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(widget => (
              <Widget
                key={widget.id}
                widget={widget}
                categoryId={category.id}
                onRemove={() => dispatch(removeWidget({ categoryId: category.id, widgetId: widget.id }))}
              />
          ))}
        </div>
      ))}

      <div className="add-widget">
        <h3>Add Widget</h3>
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
        />
        <select onChange={(e) => setSelectedCategory(Number(e.target.value))}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddWidget}>Add Widget</button>
      </div>
    </div>
  );
};

export default Dashboard;

