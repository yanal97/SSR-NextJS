import { Fragment } from "react";
import fs from "fs";
import path from "path";

export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = [];
  data.products.forEach((item) => {
    ids.push({ params: { pid: item.id } });
  });
  return {
    paths: ids,
    // [
    //   // the items that should be pre-rendered SS
    //   { params: { pid: "p1" } },
    //   { params: { pid: "p2" } },
    //   { params: { pid: "p3" } },
    //   //   { params: { pid: "p4" } },
    // ],
    // fallback: false,
    fallback: true, // when setting to true, values that are not even in the paths could be valid, but not pre-generated
    // but we have to add a fallback in case the user accesses a url directly for an unlisted item
  };
}
