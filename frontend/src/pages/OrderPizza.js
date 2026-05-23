import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderPizza() {

  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/pizza')
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddToCart = (pizza) => {
    const cartItem = {
      id: pizza._id,
      name: pizza.name,
      type: pizza.type,
      price: pizza.price,
      quantity: 1,
      ingredients: pizza.ingredients,
      totalPrice: pizza.price,
      image: pizza.image
    };

    axios.post('http://localhost:5000/shoppingCart', cartItem)
      .then(() => {
        alert(pizza.name + ' added to cart successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {pizzas.map((pizza) => (
          <div className="col-6 mb-4" key={pizza._id}>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">

                  
                  <div>
                    <h5 className="card-title">{pizza.name}</h5>
                    {pizza.type === 'veg' ?
                      <span style={{color:'green'}}>🟩</span> :
                      <span style={{color:'red'}}>🟥</span>
                    }
                    <p>₹{pizza.price}</p>
                    <p>{pizza.description}</p>
                    <p><b>Ingredients : </b>{pizza.ingredients.join(', ')}</p>
                    <p><b>Toppings : </b>{pizza.topping.join(', ')}</p>
                  </div>

                  
                  <div className="d-flex flex-column align-items-center">
                    <img src={pizza.image} alt={pizza.name}
                      style={{width:'150px', height:'150px'}} />
                    <button className="btn btn-warning mt-2"
                      onClick={() => handleAddToCart(pizza)}>
                      Add to Cart
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4 mb-2">
        <p style={{color: "orange"}}>Debraj Ghosh C21805211 2026 Demo Project Pizzeria</p>
      </div>
    </div>
  );
}

export default OrderPizza;