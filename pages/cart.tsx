import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar/NavBar";
import Product from "../components/product/product";
import ProductContext from "../functions/ProductContext";

const Home: NextPage = () => {
  const [data, setData] = useState<Object[]>([]);
  const { cart_items } = useContext(ProductContext);
  useEffect(() => {
    cart_items.forEach(async (item) => {
      let res = await fetch(`http://localhost:5000/products/${item.item_id}`);
      let data = await res.json();
      setData((d: Object[]) => {
        d.push(data);
        return d;
      });
    });
  }, [cart_items]);

  if (data.length == cart_items.length)
    return (
      <>
        <NavBar />
        <div className="px-2.5 lg:px-20 2xl:px-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-6 sm:gap-y-4">
          {data.map((item: any, index: number) => {
            if (item.email) return null;
            console.log(item);
            return (
              <Product
                id={item.id}
                name={item.title}
                price={parseInt(item.amount)}
                rating={parseInt(item.rating)}
                img={item.image}
              />
            );
          })}
        </div>
      </>
    );
  return null;
};

export default Home;
