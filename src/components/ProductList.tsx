import React, { useEffect, useState } from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import "./ProductList.css";

export default function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [addEditMode, setAddEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product>();

  function addProduct() {
    setAddEditMode(true);
  }

  function editProduct(product: Product) {
    setProductToEdit(product);
    setAddEditMode(true);
  }

  function productSaved(product: Product) {
    if (productToEdit) {
      setProductToEdit(undefined);
      const ndx = products.findIndex((p) => p.productId === product.productId);
      products[ndx] = product;
      setProducts([...products]);
    } else {
      setProducts([...products, product]);
    }
    setAddEditMode(false);
  }

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}product`);
      if (res.ok) {
        const json = await res.json();
        setProducts(json);
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
          <button type="button" onClick={addProduct}>
            Add
          </button>
          <div className="Product-list">
            {products.map((p) => (
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
