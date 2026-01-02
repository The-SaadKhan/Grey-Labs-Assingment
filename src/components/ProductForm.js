import React, { useState, useEffect } from 'react';
import './ProductForm.css';

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description || ''
      });
    }
  }, [product]);

  const validate = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Product name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Product name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'price':
        if (!value) {
          newErrors.price = 'Price is required';
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          newErrors.price = 'Price must be a positive number';
        } else {
          delete newErrors.price;
        }
        break;

      case 'category':
        if (!value.trim()) {
          newErrors.category = 'Category is required';
        } else {
          delete newErrors.category;
        }
        break;

      case 'stock':
        if (value !== '' && (isNaN(value) || parseInt(value) < 0)) {
          newErrors.stock = 'Stock must be a non-negative number';
        } else {
          delete newErrors.stock;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (touched[name]) {
      validate(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validate(name, value);
  };

  const validateAll = () => {
    const fieldsToValidate = ['name', 'price', 'category', 'stock'];
    let isValid = true;

    fieldsToValidate.forEach(field => {
      if (!validate(field, formData[field])) {
        isValid = false;
      }
    });

    setTouched({
      name: true,
      price: true,
      category: true,
      stock: true,
      description: true
    });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: formData.stock ? parseInt(formData.stock) : 0,
      ...(product && { id: product.id })
    };

    onSave(productData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">
              Product Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name && touched.name ? 'error' : ''}
              placeholder="Enter product name"
            />
            {errors.name && touched.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">
                Price <span className="required">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.price && touched.price ? 'error' : ''}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.price && touched.price && (
                <span className="error-message">{errors.price}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.stock && touched.stock ? 'error' : ''}
                placeholder="0"
                min="0"
              />
              {errors.stock && touched.stock && (
                <span className="error-message">{errors.stock}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">
              Category <span className="required">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.category && touched.category ? 'error' : ''}
              placeholder="Enter category"
            />
            {errors.category && touched.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter product description (optional)"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
