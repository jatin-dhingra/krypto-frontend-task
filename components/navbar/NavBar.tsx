import { useRouter } from "next/router";
import { useContext, useState } from "react";
import ProductContext from "../../functions/ProductContext";
import Button from "../button/Button";
import ShoppingCart from "../shopping-cart/ShoppingCart";

export default function NavBar() {
  const { id, setId, cart_items } = useContext(ProductContext);
  const router = useRouter();

  const nextPage = (name: string) => {
    if (name == "") router.push("/login");
    else if (setId) setId("");
  };

  return (
    <nav className="px-2.5 lg:px-20 2xl:px-40 py-10 flex justify-between items-center h-28">
      <h1 className="text-4xl uppercase font-bold font-['Oswald'] tracking-tight">
        ShopKart
      </h1>
      <div className="flex uppercase items-center">
        <Button onClick={() => router.push(`/`)}>Products</Button>
        <Button onClick={() => nextPage(id ?? "")}>
          {!id ? "Sign In" : "Log Out"}
        </Button>
        <Button
          variant="plain"
          className="badge"
          onClick={() => router.push(!id ? "/login" : "/cart")}
        >
          <ShoppingCart count={cart_items.length} />
        </Button>
      </div>
    </nav>
  );
}
