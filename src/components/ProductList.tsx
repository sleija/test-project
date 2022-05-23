import React, { useEffect, useState } from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import "./ProductList.css";

export default function ProductList(): JSX.Element {
  // const products_old: Product[] = [
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
      const res = await fetch("http://localhost:3009/v1/product");
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
