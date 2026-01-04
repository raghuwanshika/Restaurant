import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(10); // Default tax rate 10%

  const addItem = () => {
    if (itemName && itemPrice > 0 && itemQuantity > 0) {
      const newItem = {
        id: Date.now(),
        name: itemName,
        price: parseFloat(itemPrice),
        quantity: parseInt(itemQuantity),
      };
      setItems([...items, newItem]);
      setItemName('');
      setItemPrice('');
      setItemQuantity(1);
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  return (
    <div className="App container">
      <h1 className="text-center my-4">Restaurant Bill Generator</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Add Item</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              min="1"
            />
          </div>
          <button className="btn btn-primary" onClick={addItem}>Add Item</button>
        </div>
        <div className="col-md-6">
          <h2>Bill</h2>
          <div className="mb-3">
            <label>Tax Rate (%):</label>
            <input
              type="number"
              className="form-control"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.01"
            />
          </div>
          <ul className="list-group">
            {items.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                </div>
                <div>
                  ${(item.price * item.quantity).toFixed(2)}
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-section">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax ({taxRate}%): ${tax.toFixed(2)}</p>
            <h4>Total: ${total.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
