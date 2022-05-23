import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="Main-body">
        <div className="Left-nav"></div>
        <ProductList />
      </div>
    </div>
  );
}

export default App;
