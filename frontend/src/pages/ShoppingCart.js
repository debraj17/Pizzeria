import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShoppingCart() {

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
      
  }, []);

  const fetchCartItems = () => {
    axios.get('http://localhost:5000/shoppingCart')
      .then((response) => {
        setCartItems(response.data);
        calculateTotal(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
  };

  const handleDelete = (id, type) => {
    if (type !== 'ingredients') {
      const pizzasInCart = cartItems.filter(
        (item) => item.type !== 'ingredients'
      );

      const ingredientsInCart = cartItems.filter(
        (item) => item.type === 'ingredients'
      );

      
      if (pizzasInCart.length === 1 && ingredientsInCart.length > 0) {
        const confirm = window.confirm(
          'If you delete this all the ingredients will be deleted! Are you sure?'
        );
        if (!confirm) return;
      }
    }

    axios.delete(`http://localhost:5000/shoppingCart/${id}`)
      .then(() => {
        axios.get('http://localhost:5000/shoppingCart')
          .then((response) => {
            const remaining = response.data;
            const pizzasLeft = remaining.filter(
              (item) => item.type !== 'ingredients'
            );

            if (pizzasLeft.length === 0) {
              const ingredientItems = remaining.filter(
                (item) => item.type === 'ingredients'
              );
              const deletePromises = ingredientItems.map((item) =>
                axios.delete(`http://localhost:5000/shoppingCart/${item._id}`)
              );
              Promise.all(deletePromises).then(() => {
                fetchCartItems();
              });
            } else {
              fetchCartItems();
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuantity = (id, quantity) => {
    if (quantity < 1) {
      alert(`Quantity cannot be less than 1,if you don't want it you can delete it`);
      return;
    }
    axios.put(`http://localhost:5000/shoppingCart/${id}`, { quantity: quantity })
      .then(() => {
        fetchCartItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}
                style={item.type === 'ingredients' ?
                  {backgroundColor:'#f9f9f9', fontSize:'13px'} : {}}>
                <td>
                  <img src={item.image} alt={item.name}
                    style={item.type === 'ingredients' ?
                      {width:'35px', height:'35px', borderRadius:'50%'} :
                      {width:'50px', height:'50px'}}
                  />
                </td>
                <td style={item.type === 'ingredients' ? {color:'gray'} : {}}>
                  {item.type === 'ingredients' ? `+ ${item.name}` : item.name}
                </td>
                <td style={item.type === 'ingredients' ? {color:'gray'} : {}}>
                  ₹{item.price}
                </td>
                <td>
                  {item.type !== 'ingredients' && (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantity(item._id,
                        parseInt(e.target.value))}
                      style={{width:'60px'}}
                    />
                  )}
                </td>
                <td>
                  <button
                    className={item.type === 'ingredients' ?
                      'btn btn-danger btn-sm' : 'btn btn-danger'}
                    onClick={() => handleDelete(item._id, item.type)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h4>Total : ₹{totalPrice}</h4>
      <div className="text-center mt-4 mb-2">
        <p style={{color: 'orange'}}>Debraj Ghosh C21805211 2026 Demo Project Pizzeria</p>
      </div>
    </div>
  );
}

export default ShoppingCart;