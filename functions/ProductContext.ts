import React from "react";
import { CartItem, Favourites, UserData } from "../interfaces/userContent";

const intitialValue: UserData = {
  firstname: "",
  setName: (value: string) => {},
  favourites: Array<Favourites>(),
  setFavourites: (value: Favourites[]) => {},
  cart_items: Array<CartItem>(),
  setOrders: (value: CartItem[]) => {},
};

const ProductContext = React.createContext(intitialValue);

export default ProductContext;
