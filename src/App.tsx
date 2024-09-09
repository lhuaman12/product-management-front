import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/login/LoginForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/products" element={<div>productos</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
