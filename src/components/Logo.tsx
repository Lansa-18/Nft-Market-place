import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="flex gap-6 items-center">
      <div className="w-[12%]">
        <Link to='/mycart'>
        <img src="/stak-logo2.png" alt="logo-imgage" />
        </Link>
      </div>
      <h2 className="font-semibold text-[2rem]">Luxeshop</h2>
    </div>
  );
}
