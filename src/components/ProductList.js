import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  // getting product from useFilterContext
  const { filtered_products: products, grid_view } = useFilterContext();

  // when no matching product
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: `none` }}>
        Sorry, no products matches your search...
      </h5>
    );
  }

  // controls grid view
  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products}></GridView>;
};

export default ProductList;
