import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { CartItem, Favourites } from "../interfaces/userContent";
import ProductContext from "../functions/ProductContext";
import { getLocalStorage } from "../functions/functions";

function MyApp({ Component, pageProps }: AppProps) {
  const [hydrate, setHydrate] = useState(false);
  const [id, setId] = useState(() => getLocalStorage("id", ""));
  const [favourites, setFavourites] = useState(() =>
    getLocalStorage("favourites", new Array<Favourites>())
  );
  const [orders, setOrders] = useState(() =>
    getLocalStorage("orders", new Array<CartItem>())
  );

  useEffect(() => setHydrate(true), []);

  useEffect(() => {
    localStorage.setItem("id", id);
  }, [id]);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    console.log(orders);
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  if (hydrate)
    return (
      <ProductContext.Provider
        value={{
          id: id,
          setId: setId,
          favourites: favourites,
          setFavourites: setFavourites,
          cart_items: orders,
          setOrders: setOrders,
        }}
      >
        <Component {...pageProps} />
      </ProductContext.Provider>
    );
  return null;
}

export default MyApp;
