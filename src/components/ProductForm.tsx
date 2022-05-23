import React, { useState } from "react";
import { Product, ProductStatus } from "../types";

export default function ProductForm(props: {
  productToEdit?: Product;
  productSaved: Function;
}): JSX.Element {
  const productToAdd: Product = {
    name: "",
    description: "",
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

  const handleSubmit = async () => {
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={product.name} onChange={handleNameChange} />
      </label>
      <label>
        Description:
        <textarea
          value={product.description}
          onChange={handleDescriptionChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
