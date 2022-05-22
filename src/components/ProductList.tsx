import React from "react";
import { Product } from "../App";
import ProductCard from "./ProductCard";
import "./ProductList.css";

export default function ProductList(props: {
  products: Product[];
}): JSX.Element {
  const products = props.products;

  return (
    <div className="Product-list">
      {products.map((p) => (
        <ProductCard product={p}></ProductCard>
      ))}
    </div>
  );
}
