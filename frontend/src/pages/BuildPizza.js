import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuildPizza() {

  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/ingredient')
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('http://localhost:5000/shoppingCart')
      .then((response) => {
        const cart = response.data;
        setCartItems(cart);

        // Get all ingredient items from cart
        const cartIngredientNames = cart
          .filter((item) => item.type === 'ingredients')
          .map((item) => item.name);

        // Sync checkboxes
        axios.get('http://localhost:5000/ingredient')
          .then((ingResponse) => {
            const allIngredients = ingResponse.data;

            const alreadySelected = allIngredients.filter((ing) =>
              cartIngredientNames.includes(ing.name)
            );

            setSelectedIngredients(alreadySelected);
            setTotalCost(
              alreadySelected.reduce((sum, ing) => sum + ing.price, 0)
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckbox = (ingredient) => {
    if (cartItems.length === 0) {
      alert('Please select a pizza first! Go to Order Pizza page.');
      return;
    }

    const isSelected = selectedIngredients.find(
      (item) => item._id === ingredient._id
    );

    if (isSelected) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item._id !== ingredient._id)
      );
      setTotalCost(totalCost - ingredient.price);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setTotalCost(totalCost + ingredient.price);
    }
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert('Please select a pizza first! Go to Order Pizza page.');
      return;
    }

    if (selectedIngredients.length === 0) {
      alert('Please select at least one ingredient!');
      return;
    }

    
    const alreadyInCart = cartItems
      .filter((item) => item.type === 'ingredients')
      .map((item) => item.name);

    // Only POST ingredients that are NOT already in cart
    const newIngredients = selectedIngredients.filter(
      (ing) => !alreadyInCart.includes(ing.name)
    );

    if (newIngredients.length === 0) {
      alert('All selected ingredients are already in your cart!');
      return;
    }

    const promises = newIngredients.map((ingredient) => {
      const ingredientCartItem = {
        name: ingredient.name,
        type: 'ingredients',
        price: ingredient.price,
        quantity: 1,
        ingredients: [],
        totalPrice: ingredient.price,
        image: ingredient.image
      };
      return axios.post('http://localhost:5000/shoppingCart', ingredientCartItem);
    });

    Promise.all(promises)
      .then(() => {
        alert('Ingredients added to cart successfully!');
        axios.get('http://localhost:5000/shoppingCart')
          .then((response) => {
            setCartItems(response.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pizzaPrice = cartItems
    .filter((item) => item.type !== 'ingredients')
    .reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mt-4">
      <p className="text-center">
        Pizzeria now gives you options to build your own pizza.
        Customize your pizza by choosing ingredients from the list given below
      </p>
      {cartItems.length === 0 && (
        <div className="alert alert-warning text-center">
          Please select a pizza first from Order Pizza!
        </div>
      )}
      <table className="table table-bordered">
        <thead className='text-center'>
          <tr>
            <td>Ingredients</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody className='text-center'>
          {ingredients.map((ingredient) => (
            <tr key={ingredient._id}>
              <td>
                <img src={ingredient.image} alt={ingredient.name}
                  style={{width:'50px', height:'50px'}} />
              </td>
              <td>{ingredient.name} ₹{ingredient.price}</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!selectedIngredients.find(
                    (item) => item._id === ingredient._id
                  )}
                  onChange={() => handleCheckbox(ingredient)}
                />
                <span> Add</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Price Breakdown */}
      <div className='mt-3'>
        <table className='table table-borderless w-auto'>
          <tbody>
            <tr>
              <td className='text-muted'>Base Pizza Price</td>
              <td className='px-3'>:</td>
              <td className='fw-bold'>₹{pizzaPrice}</td>
            </tr>
            <tr>
              <td className='text-muted'>Ingredients Price</td>
              <td className='px-3'>:</td>
              <td className='fw-bold'>₹{totalCost}</td>
            </tr>
            <tr>
              <td className='text-primary fw-bold'>Total Cost</td>
              <td className='px-3'>:</td>
              <td className='text-primary fw-bold'>₹{pizzaPrice + totalCost}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="btn btn-dark mt-2" onClick={handleOrder}>
        Build Ur Pizza
      </button>
      <div className="text-center mt-4 mb-2">
        <p style={{color: 'orange'}}>Debraj Ghosh C21805211 2026 Demo Project Pizzeria</p>
      </div>
    </div>
  );
}

export default BuildPizza;