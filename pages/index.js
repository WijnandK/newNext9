import React from "react";
import axios from "axios";
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from "../utils/baseUrl";
import ProductList from "../components/Index/ProductList";

function Home({ products, totalPages }) {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;

  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Home;
