import React from "react";
import ProductCard from ".";
import { Product } from "../../generated/graphql";

interface props {
  products: Product[];
}

const ProductList: React.FC<props> = ({ products }) => {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(232px, 1fr)" }}
    >
      {products?.map((p) => (
        <ProductCard product={p} key={p.productId} />
      ))}
    </div>
  );
};

export default ProductList;
