export interface Favourites {
  item_id: number;
  user_id: number;
}

export interface CartItem {
  item_id: number;
  user_id: number;
  qty: number;
}

export interface UserData {
  id?: string;
  setId?: (value: string) => any;
  firstname?: string;
  setName?: (value: string) => any;
  favourites: Array<Favourites>;
  setFavourites: (value: Favourites[]) => any;
  cart_items: Array<CartItem>;
  setOrders: (value: CartItem[]) => any;
}
