import type { NextPage } from "next";
import NavBar from "../components/navbar/NavBar";
import Product from "../components/product/product";
export async function getServerSideProps() {
  const res = await fetch("http://localhost:5000/products");
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}

const Home: NextPage = ({ data }: any) => {
  return (
    <>
      <NavBar />
      <div className="px-2.5 lg:px-20 2xl:px-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-6 sm:gap-y-4">
        {data.map((item: any, index: number) => {
          if (item.email) return null;
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
};

export default Home;
