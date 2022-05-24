import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import "./ProductList.css";

export default function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [addEditMode, setAddEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product>();
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  function addProduct() {
    setProductToEdit(undefined);
    setAddEditMode(true);
  }

  function editProduct(product: Product) {
    setProductToEdit(product);
    setAddEditMode(true);
  }

  function productSaved(product: Product) {
    if (product) {
      if (productToEdit) {
        setProductToEdit(undefined);
        const ndx = products.findIndex(
          (p) => p.productId === product.productId
        );
        products[ndx] = product;
        setProducts([...products]);
      } else {
        setProducts([...products, product]);
      }
    }
    setAddEditMode(false);
  }

  function handleShowActiveOnly(event: any) {
    const newShowActiveOnly = !showActiveOnly;
    setShowActiveOnly(newShowActiveOnly);
    if (newShowActiveOnly) {
      setProductsToShow(products.filter((p) => p.active));
    } else {
      setProductsToShow(products);
    }
  }

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}product`);
      if (res.ok) {
        const json = await res.json();
        setProducts(json);
        setProductsToShow(json);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div>
      {addEditMode && (
        <ProductForm
          productToEdit={productToEdit}
          productSaved={productSaved}
        />
      )}
      {!addEditMode && (
        <div>
          <div className="Product-list-button">
            <Button variant="contained" onClick={addProduct}>
              Add Product
            </Button>
            <FormControlLabel
              sx={{ m: 2 }}
              control={
                <Checkbox
                  checked={showActiveOnly}
                  onChange={handleShowActiveOnly}
                />
              }
              label="Show Active Only"
            />
          </div>
          <div className="Product-list">
            {productsToShow.map((p) => (
              <ProductCard
                key={p.productId}
                product={p}
                editProduct={editProduct}
              ></ProductCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
