# Item Filter Application

## Overview

This React application provides a user interface for managing a list of items. It features item creation, editing, deletion, searching, and pagination. The app uses Redux for state management and connects to a json-server backend for data persistence.

## Features

- Create new items with a title and body
- Edit existing items
- Delete items
- Search items by title or body content
- Paginated item list
- Responsive design

## Technologies Used

- React
- Redux (with Redux Toolkit)
- json-server (for backend API)
- CSS-in-JS for styling

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up json-server:
   - Install json-server globally if you haven't already:
     ```
     npm install -g json-server
     ```
   - Create a `db.json` file in the project root with the following structure:
     ```json
     {
       "list": []
     }
     ```
   - Create a `routes.json` file in the project root with the following content:
     ```json
     {
       "/list\\?_page=:page&_limit=:limit": "/list?_page=:page&_limit=:limit"
     }
     ```

4. Start the json-server:
   ```
   json-server --watch db.json --port 3000 --routes routes.json
   ```

5. In a new terminal, start the React application:
   ```
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- **Create an Item**: Click the "Create New Item" button, fill in the title and body, then submit the form.
- **Edit an Item**: Click the "Edit" button on an item, make your changes, then click "Save".
- **Delete an Item**: Click the "Delete" button on an item to remove it.
- **Search Items**: Use the search bar at the top to filter items by title or body content.
- **Navigate Pages**: Use the pagination controls at the bottom of the item list to move between pages.

## Project Structure

- `src/`
  - `Components/`: React components
    - `CreateItemForm.jsx`: Form for creating new items
    - `Item.jsx`: Individual item component
    - `ItemList.jsx`: List of items with pagination
    - `SearchBar.jsx`: Search input for filtering items
  - `Redux/`: Redux related files
    - `ItemSlice.js`: Redux slice for managing items state
  - `App.js`: Main application component
  - `index.js`: Entry point of the React application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
