
import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OrderPizza from './pages/OrderPizza';
import BuildPizza from './pages/BuildPizza';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/orderPizza" element={<OrderPizza />} />
        <Route path="/buildPizza" element={<BuildPizza />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;