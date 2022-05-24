import { Button, Card } from "@mui/material";
import React from "react";
import { Product } from "../types";
import "./ProductCard.css";

export default function ProductCard(props: {
  product: Product;
  editProduct: Function;
}): JSX.Element {
  const product = props.product;

  return (
    <Card sx={{ m: 2 }}>
      <div className="Product-card-field">{product.name}</div>
      <div className="Product-card-field">{product.description}</div>
      <div className="Product-card-field">${product.price}</div>
      <div className="Product-card-field">
        {product.active ? "Active" : "Inactive"}
      </div>
      <div className="Product-card-field">
        <Button
          variant="contained"
          onClick={(event) => {
            props.editProduct(product);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}
