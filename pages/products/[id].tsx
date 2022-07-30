import { useContext, useState } from "react";
import Button from "../../components/button/Button";
import NavBar from "../../components/navbar/NavBar";
import ProductContext from "../../functions/ProductContext";
import { UserData } from "../../interfaces/userContent";

export async function getServerSideProps(context: any) {
  const URL = "http://localhost:5000/products/";
  const { id } = context.params;

  const res = await fetch(URL + id);
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
}

export default function ProductItem({ data }: any) {
  const { id, cart_items, setOrders } = useContext(ProductContext);

  const addToCart = (id: number, user_id: number, qty = 1) => {
    let temp = new Set<string>();
    cart_items.forEach((item) => temp.add(JSON.stringify(item)));
    let newItem = JSON.stringify({
      item_id: id,
      user_id: user_id,
      qty: qty,
    });
    if (temp.has(newItem)) temp.delete(newItem);
    else temp.add(newItem);
    console.log(temp);
    setOrders(Array.from(temp).map((item) => JSON.parse(item)));
    //AddToFavourites(id, id);
  };

  console.log(data);
  return (
    <div className="h-screen overflow-hidden">
      <NavBar />
      <div className="px-2.5 lg:px-20 2xl:px-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_3fr_1fr] gap-8 sm:gap-6 sm:gap-y-4">
        <div
          className="h-screen w-full"
          style={{
            background: `url('${data.image}')`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="flex flex-col gap-y-4">
          <h1 className="uppercase font-['Oswald'] text-4xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="text-xl font-thin">{data.description}</p>
          <h3 className="font-['Oswald'] text-2xl lg:text-3xl">
            $ {data.amount}
          </h3>
          <p className="text-black/[0.65] font-thin">MRP incl. of all taxes</p>
          <Button
            className="bg-black text-white hover:bg-black py-6"
            onClick={() => addToCart(data.id, parseInt(id || "0"))}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
