import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Button from "../components/button/Button";
import { UserLogin } from "../functions/functions";
import ProductContext from "../functions/ProductContext";

export default function Login() {
  const { setId, id } = useContext(ProductContext);
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [animIndex, setAnimIndex] = useState(0);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("Login");

  useEffect(() => {
    const anim = setInterval(() => {
      setAnimIndex((index) => (index + 1) % 3);
    }, 600);

    return () => clearInterval(anim);
  }, []);

  const doLogin = () => {
    setErr("");
    setLoading(true);
    UserLogin(user, pass)
      .then((res) =>
        res.json().then((data) => {
          if (res.status == 400) {
            setErr(data);
            setLoading(false);
          } else {
            if (setId) setId(data.user.id ?? "");
            setTimeout(() => {
              router.push("/");
            }, 1500);
          }
        })
      )
      .catch((err: Error) => {
        setErr(err.message);
      });
  };

  const AnimLoading = () => {
    return (
      <div className="flex content-center items-center gap-x-3">
        <div
          className={`w-2 h-2 rounded-2xl duration-450 bg-white`}
          style={{
            opacity: animIndex == 0 ? 1 : 0.3,
          }}
        ></div>
        <div
          className={`w-2 h-2 rounded-2xl duration-450 bg-white`}
          style={{
            opacity: animIndex == 1 ? 1 : 0.3,
          }}
        ></div>
        <div
          className={`w-2 h-2 rounded-2xl duration-450 bg-white`}
          style={{
            opacity: animIndex == 2 ? 1 : 0.3,
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 h-screen w-screen flex flex-col gap-y-4 justify-center items-center">
      <h1 className="text-3xl uppercase font-bold font-['Oswald'] tracking-tight text-white">
        ShopKart
      </h1>
      <div className="px-10 py-8 w-1/4 h-1/2 bg-white flex flex-col justify-between items-start">
        <div className="flex flex-col gap-y-6 w-full">
          <h1 className="text-xl font-semibold">Login to Shopkart</h1>
          <div className="flex flex-col gap-y-1 w-full font-medium">
            <h3>Email Address</h3>
            <input
              value={user}
              onChange={(event) => setUser(event.target.value)}
              className="w-full border-2 rounded duration-300 px-3 py-2 font-normal focus:border-blue-600"
              type="text"
              name="username"
              placeholder="Your email address"
              required
            />
          </div>
          <div className="flex flex-col gap-y-1 w-full font-normal">
            <h3>Password</h3>
            <input
              value={pass}
              onChange={(event) => setPass(event.target.value)}
              className="w-full border-2 rounded duration-300 px-3 py-2 font-normal focus:border-blue-600"
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
          </div>
          <h3 className="text-red-600">{err}</h3>
        </div>
        <div className="w-full flex flex-col gap-y-3">
          <Button
            className="w-full bg-slate-700 hover:bg-slate-900 text-white text-md font-medium py-3 flex justify-center items-center duration-300 h-12"
            onClick={() => doLogin()}
          >
            {loading ? <AnimLoading /> : "Log In"}
          </Button>
          <h3 className="font-thin text-center">
            Don't have a Shopkart account?{" "}
            <span
              className="duration-300 underline underline-offset-1 hover:underline-offset-4 hover:cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
