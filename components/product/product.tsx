import { useRouter } from "next/router";
import { useContext } from "react";
import { Check, Heart, Plus, Star } from "react-feather";
import { AddToFavourites } from "../../functions/functions";
import ProductContext from "../../functions/ProductContext";
import { CartItem, Favourites, UserData } from "../../interfaces/userContent";

interface Props {
  id: number;
  name: string;
  price: number;
  img: string;
  rating: number;
}

export default function Product({ id, name, price, img, rating }: Props) {
  const router = useRouter();

  let { cart_items, setOrders, favourites, setFavourites }: UserData =
    useContext(ProductContext);

  const addToFavourites = (id: number, user_id: number) => {
    let temp = new Set<string>();
    favourites.forEach((item) => temp.add(JSON.stringify(item)));
    let newItem = JSON.stringify({
      item_id: id,
      user_id: user_id,
    });
    if (temp.has(newItem)) temp.delete(newItem);
    else temp.add(newItem);
    console.log(temp);
    setFavourites(Array.from(temp).map((item) => JSON.parse(item)));
    //AddToFavourites(id, id);
  };

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

  return (
    <div
      className="w-full flex flex-col gap-y-1 pb-20 hover:cursor-pointer"
      key={id}
    >
      <div>
        <div
          className="h-[calc(50vh-1.5rem)] p-4 w-full ease-in-out flex flex-col justify-between items-center"
          style={{
            background: `url('${img}')`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
          onClick={() => router.push(`/products/${id}`)}
        >
          <div className="flex w-full justify-between items-start">
            <h2 className="uppercase font-light flex gap-x-1 items-center">
              {/* {Array(parseInt(rating))
                .fill(0)
                .map(() => (
                  <Star className="w-4 h-4 stroke-1 stroke-yellow-500 fill-yellow-500" />
                ))} */}
            </h2>
            <div
              className="h-10 w-10 flex justify-center items-center bg-white/[0.6] hover:bg-white duration-300 rounded-3xl hover:cursor-pointer"
              onClick={() => addToFavourites(id, id)}
            >
              <Heart
                className="stroke-1 duration-300"
                style={{
                  fill:
                    favourites.filter((item: Favourites) => item.item_id == id)
                      .length > 0
                      ? "red"
                      : "transparent",
                  stroke:
                    favourites.filter((item: Favourites) => item.item_id == id)
                      .length > 0
                      ? "red"
                      : "black",
                }}
              />
            </div>
          </div>
          {cart_items.filter((item: Favourites) => item.item_id == id).length >
          0 ? (
            <div className="h-8 w-8 flex justify-center items-center bg-white duration-300 rounded-3xl hover:cursor-pointer">
              <Check className="w-4 h-4 stroke-green-400 stroke-2" />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex justify-between items-start">
        <h2 className="uppercase font-light text-sm">
          {name.substring(0, 25)}...
        </h2>
        <h2 className="uppercase font-light px-2.5 py-0.5 bg-yellow-300 text-sm">
          $ {price}
        </h2>
      </div>
    </div>
  );
}
