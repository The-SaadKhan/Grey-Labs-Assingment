#  Product Management Application

A modern, feature-rich Product Management System built with React that allows users to manage products with full CRUD operations, real-time search, pagination, and a beautiful dark mode interface.

##  Live Demo

**[View Live Demo](#)** *(Link will be added soon)*

---

##  Features

### Core Functionality
-  **Product List Display** - View products in both Card and List (Table) views
-  **Add Products** - Create new products with comprehensive form validation
-  **Edit Products** - Update existing product information
-  **Delete Products** - Remove products with confirmation
-  **Real-time Search** - Search products by name with 500ms debounce
-  **Pagination** - Navigate through products with smart pagination controls
-  **View Toggle** - Switch seamlessly between Card and List views

### UI/UX Enhancements
-  **Dark Mode** - Beautiful dark theme with smooth transitions
-  **Modern Design** - Clean, responsive interface with gradient effects
-  **Smooth Animations** - Enhanced hover effects and transitions
-  **Fully Responsive** - Works perfectly on all device sizes
-  **User-Friendly** - Intuitive navigation and clear visual feedback

### Technical Features
-  **Form Validation** - Real-time input validation with error messages
-  **New Products First** - Newly added products appear at the top
-  **In-Memory Storage** - All data stored and managed in browser memory
-  **Debounced Search** - Optimized search performance
-  **Multiple Views** - Card grid and table list views

---

##  Tech Stack

- **React 18.2.0** - Modern React with Hooks
- **JavaScript (ES6+)** - Latest JavaScript features
- **CSS3** - Custom styling with animations and transitions
- **React Scripts 5.0.1** - Build tooling and development server

---

##  Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)

---

##  Installation & Setup

1. **Clone the repository**
   bash
   git clone repository-url
   cd product-management-app


2. **Install dependencies**
   bash
   npm install


3. **Start the development server**
   bash
   npm start


4. **Open your browser**
   - Navigate to http://localhost:3000
   - The app will automatically reload when you make changes

---

##  Usage Guide

### Adding a Product
1. Click the **"+ Add Product"** button
2. Fill in the required fields:
   - **Name** (required)
   - **Price** (required, must be a positive number)
   - **Category** (required)
   - **Stock** (optional, must be non-negative)
   - **Description** (optional)
3. Click **"Add Product"** to save

### Editing a Product
1. Click the **"Edit"** button on any product card/row
2. Modify the fields as needed
3. Click **"Update Product"** to save changes

### Deleting a Product
1. Click the **"Delete"** button on any product card/row
2. Confirm the deletion in the popup dialog

### Searching Products
- Type in the search bar to filter products by name
- Search is debounced (500ms) for optimal performance

### Switching Views
- Click the **grid icon** for Card View
- Click the **list icon** for Table/List View

### Dark Mode
- Click the **moon icon** () in the header to enable dark mode
- Click the **sun icon** () to switch back to light mode

---

##  Project Structure

product-management-app/
 public/
    index.html              # HTML template
 src/
    components/
       ProductList.js      # Product display component
       ProductList.css     # Product list styling
       ProductForm.js      # Add/Edit product form
       ProductForm.css     # Form styling
       SearchBar.js        # Search component with debounce
       SearchBar.css       # Search bar styling
       Pagination.js       # Pagination component
       Pagination.css      # Pagination styling
    App.js                  # Main application component
    App.css                 # Main app styling
    index.js                # React entry point
    index.css               # Global styles
 package.json                # Project dependencies
 README.md                   # Project documentation

---

##  Available Scripts

### npm start
Runs the app in development mode at http://localhost:3000

### npm run build
Builds the app for production to the build folder

### npm test
Launches the test runner in interactive watch mode

---

##  Future Enhancements

- [ ] LocalStorage persistence
- [ ] Export products to CSV/Excel
- [ ] Bulk delete operations
- [ ] Advanced filtering (by category, price range)
- [ ] Sorting options (by name, price, stock)
- [ ] Image upload for products

---

##  Contributing

Contributions, issues, and feature requests are welcome!

---

##  License

This project is open source and available under the MIT License.

---

** If you like this project, please give it a star!**
