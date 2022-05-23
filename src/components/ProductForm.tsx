import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { Product, ProductStatus } from "../types";

export default function ProductForm(props: {
  productToEdit?: Product;
  productSaved: Function;
}): JSX.Element {
  const productToAdd: Product = {
    name: "",
    description: "",
    price: 0,
    status: ProductStatus.Active,
  };

  const [product, setProduct] = useState<Product>(
    props.productToEdit || productToAdd
  );

  function handleNameChange(event: { target: { value: string } }) {
    const newName: string = event.target.value as string;
    setProduct({ ...product, name: newName });
  }

  function handleDescriptionChange(event: { target: { value: string } }) {
    const newDescription: string = event.target.value as string;
    setProduct({ ...product, description: newDescription });
  }

  function handlePriceChange(event: { target: { value: string } }) {
    const newPrice: number = parseFloat(event.target.value);
    setProduct({ ...product, price: newPrice });
  }

  function handleStatusChange(event: { target: { value: string } }) {
    let newStatus =
      product.status === ProductStatus.Active
        ? ProductStatus.Inactive
        : ProductStatus.Active;
    setProduct({ ...product, status: newStatus });
  }

  const saveProduct = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}product`, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
      }),
      body: JSON.stringify(product),
    });
    if (res.ok) {
      const json = await res.json();
      props.productSaved(json);
    }
  };

  return (
    <div>
      <TextField
        sx={{ m: 2 }}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={product.name}
        onChange={handleNameChange}
      />
      <br />
      <TextField
        sx={{ m: 2, width: "75ch" }}
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={product.description}
        onChange={handleDescriptionChange}
        multiline
        minRows={5}
      />
      <br />
      <TextField
        sx={{ m: 2 }}
        id="outlined-basic"
        label="Price"
        variant="outlined"
        value={product.price}
        onChange={handlePriceChange}
        type="number"
      />
      <br />
      <FormControlLabel
        sx={{ m: 2 }}
        control={
          <Checkbox
            checked={product.status === ProductStatus.Active}
            onChange={handleStatusChange}
          />
        }
        label="Active"
      />
      <br />
      <Button sx={{ m: 2 }} variant="contained" onClick={saveProduct}>
        Save Product
      </Button>
    </div>
  );
}
