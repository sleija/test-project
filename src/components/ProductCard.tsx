import React from "react";
import { Product } from "../types";
import "./ProductCard.css";

export default function ProductCard(props: { product: Product }): JSX.Element {
  const product = props.product;

  return (
    <div className="Product-card">
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.status}</div>
    </div>
  );
}
