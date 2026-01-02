import React from 'react';
import './ProductList.css';

function ProductList({ products, viewMode, onEdit, onDelete }) {
  if (products.length === 0) {
    return <div className="no-products">No products found</div>;
  }

  if (viewMode === 'list') {
    return (
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.description || '-'}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn-small"
                      onClick={() => onEdit(product)}
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn-small"
                      onClick={() => onDelete(product.id)}
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Card view
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-card-header">
            <h3>{product.name}</h3>
            <span className="product-price">${product.price.toFixed(2)}</span>
          </div>
          <div className="product-card-body">
            <div className="product-detail">
              <span className="label">Category:</span>
              <span className="value">{product.category}</span>
            </div>
            <div className="product-detail">
              <span className="label">Stock:</span>
              <span className={`value ${product.stock < 10 ? 'low-stock' : ''}`}>
                {product.stock}
              </span>
            </div>
            {product.description && (
              <div className="product-description">
                {product.description}
              </div>
            )}
          </div>
          <div className="product-card-footer">
            <button
              className="edit-btn"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
