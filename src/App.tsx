import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import ProductList from "./components/ProductList";

export const enum ProductStatus {
  InProgress = "ACTIVE",
  Paid = "INACTIVE",
}

export interface Product {
  productId?: string;
  name: string;
  description: string;
  status: ProductStatus;
}

// const products_old: Product[] = [
//   {
//     id: 1,
//     name: "Football",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     price: 30,
//   },
//   {
//     id: 2,
//     name: "Baseball Glove",
//     description:
//       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     price: 20,
//   },
//   {
//     id: 3,
//     name: "Headphones",
//     description:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
//     price: 25,
//   },
//   {
//     id: 4,
//     name: "Running Shoes",
//     description:
//       "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     price: 60,
//   },
//   {
//     id: 5,
//     name: "Water Bottle",
//     description:
//       "A erat nam at lectus. Suspendisse sed nisi lacus sed viverra. Nisl condimentum id venenatis a.",
//     price: 15,
//   },
//   {
//     id: 6,
//     name: "Workout Shorts",
//     description: "Eu non diam phasellus vestibulum lorem sed.",
//     price: 25,
//   },
// ];

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const getAllProducts = async () => {
      const res = await fetch("http://localhost:3009/v1/product");
      if (res.ok) {
        const json = await res.json();
        setProducts(json);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className="Main-body">
        <div className="Left-nav"></div>
        <ProductList products={products}></ProductList>
      </div>
    </div>
  );
}

export default App;
