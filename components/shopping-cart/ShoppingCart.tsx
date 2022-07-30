import { ShoppingBag } from "react-feather";

interface Props {
  count?: any;
}

export default function ShoppingCart({ count }: Props) {
  return (
    <div className="flex flex-col items-center content-center">
      <ShoppingBag className={`w-5 h-5 duration-300 stroke-1`} />
      <div
        className={`${
          count ? "my-1 w-2 h-2 hover:w-3 hover:h-3" : "w-0 h-0"
        } duration-300 bg-red-500 relative block rounded-2xl`}
      ></div>
    </div>
  );
}
