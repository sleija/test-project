import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { Product } from "../types";

export default function ProductForm(props: {
  productToEdit?: Product;
  productSaved: Function;
}): JSX.Element {
  const productToAdd: Product = {
    name: "",
    description: "",
    price: 0,
    active: true,
  };

  const [product, setProduct] = useState<Product>(
    props.productToEdit || productToAdd
  );

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
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <br />
      <TextField
        sx={{ m: 2, width: "75ch" }}
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
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
        onChange={(e) =>
          setProduct({ ...product, price: parseFloat(e.target.value) })
        }
        type="number"
      />
      <br />
      <FormControlLabel
        sx={{ m: 2 }}
        control={
          <Checkbox
            checked={product.active}
            onChange={(e) =>
              setProduct({ ...product, active: !product.active })
            }
          />
        }
        label="Active"
      />
      <br />
      <Button sx={{ m: 2 }} variant="contained" onClick={saveProduct}>
        Save Product
      </Button>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        onClick={(event) => {
          props.productSaved(undefined);
        }}
      >
        Cancel
      </Button>
    </div>
  );
}
