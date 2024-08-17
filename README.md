# Dynamic Dashboard

#  🚀 Overview

This project is a dynamic dashboard built using React, Redux, and JSON Server. The dashboard allows users to add, search, and delete widgets within different categories. The data is managed using a mock backend provided by JSON Server.

# ✨ Features

Add widgets to specific categories
Search widgets by name
Delete widgets from categories
Responsive UI

# 🗂 Project Structure

App.js: Main application component that handles fetching categories and managing the state of widgets.
Header.js: Header component with search functionality and navigation to the Add Widgets page.
AddWidget.js: Component for adding new widgets to a category.
db.json: Mock database used by JSON Server to store categories and widgets.

# 📋 Prerequisites

Make sure you have the following installed:

Node.js
npm
json-server

#  ⚙️ Technology Stack

Frontend: React
State Management: Redux
Backend Simulation: JSON Server

# Setup Instructions

1. Clone the Repository
git clone <repository-url>
cd <repository-folder>

2. Install Dependencies
npm install

3. Set Up JSON Server
Install JSON Server Globally
npm install -g json-server
Create data.json
{
  "categories": [
    {
      "id": "1",
      "name": "CSPM Executive Dashboard",
      "widgets": []
    },
    {
      "id": "2",
      "name": "Security Overview",
      "widgets": [
        {
          "id": "201",
          "name": "Widget A",
          "text": "This is Widget A"
        },
        {
          "id": "202",
          "name": "Widget B",
          "text": "This is Widget B"
        }
      ]
    }
  ]
}
Start JSON Server
json-server --watch data.json --port 3002

4. Run the React Application
npm start
Open http://localhost:3000 in your browser.

# 🔧 Usage

Search Widgets: Use the search bar to filter widgets by name.
Add a Widget:
Click + Add Widget.
Enter the widget name and text.
Choose a category.
Click Submit.
Remove a Widget: Click the ❌ icon next to the widget.

# 📁 Project Files

src/App.js: Main application component.
src/redux/widgetsSlice.js: Redux slice for managing widgets and categories.
src/redux/store.js: Configures the Redux store.
data.json: Initial data for categories and widgets.
