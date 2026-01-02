import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

// Initial product data
const initialProducts = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 15, description: 'High-performance laptop with 16GB RAM' },
  { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', stock: 30, description: 'Latest model with 5G support' },
  { id: 3, name: 'Headphones', price: 149.99, category: 'Electronics', stock: 50, description: 'Wireless noise-canceling headphones' },
  { id: 4, name: 'Coffee Maker', price: 79.99, category: 'Appliances', stock: 20, description: 'Programmable coffee maker with timer' },
  { id: 5, name: 'Desk Chair', price: 299.99, category: 'Furniture', stock: 12, description: 'Ergonomic office chair with lumbar support' },
  { id: 6, name: 'Monitor', price: 349.99, category: 'Electronics', stock: 25, description: '27-inch 4K monitor' },
  { id: 7, name: 'Keyboard', price: 89.99, category: 'Electronics', stock: 40, description: 'Mechanical keyboard with RGB lighting' },
  { id: 8, name: 'Mouse', price: 49.99, category: 'Electronics', stock: 60, description: 'Wireless gaming mouse' },
  { id: 9, name: 'Desk Lamp', price: 39.99, category: 'Furniture', stock: 35, description: 'LED desk lamp with adjustable brightness' },
  { id: 10, name: 'Webcam', price: 129.99, category: 'Electronics', stock: 18, description: '1080p HD webcam' },
  { id: 11, name: 'USB Hub', price: 29.99, category: 'Electronics', stock: 45, description: '7-port USB 3.0 hub' },
  { id: 12, name: 'Backpack', price: 59.99, category: 'Accessories', stock: 28, description: 'Laptop backpack with multiple compartments' },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const itemsPerPage = 6;

  // Handle search with debounce (implemented in SearchBar component)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, products]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    setProducts([newProduct, ...products]); // Add new product at the beginning
    setShowForm(false);
  };

  const handleEditProduct = (product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <h1>Product Management</h1>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark Mode">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="app-container">
        <div className="controls">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
              title="Card View"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="2" y="2" width="6" height="6" rx="1"/>
                <rect x="12" y="2" width="6" height="6" rx="1"/>
                <rect x="2" y="12" width="6" height="6" rx="1"/>
                <rect x="12" y="12" width="6" height="6" rx="1"/>
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="2" y="3" width="16" height="2" rx="1"/>
                <rect x="2" y="9" width="16" height="2" rx="1"/>
                <rect x="2" y="15" width="16" height="2" rx="1"/>
              </svg>
            </button>
          </div>

          <button className="add-btn" onClick={openAddForm}>
            + Add Product
          </button>
        </div>

        <div className="results-info">
          Showing {currentProducts.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
        </div>

        <ProductList
          products={currentProducts}
          viewMode={viewMode}
          onEdit={openEditForm}
          onDelete={handleDeleteProduct}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={closeForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
