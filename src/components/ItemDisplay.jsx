import { Link } from "react-router-dom";

export default function ItemDisplay() {
  return (
    <section className="grid grid-cols-2 gap-4 mt-[3rem]">
      <Link to="/itemsinfo">
        <article className="relative border-2 rounded-xl border-[#e6e9f0] p-10 flex flex-col gap-7">
          <div className="w-[90%]">
            <img src="/chat.png" alt="nft1-icon" />
          </div>
          <p className="text-[1.5rem] text-[#b2b2b5] font-bold">
            Ipad Pro 6th Generation 11th inch
          </p>
          <div className="absolute top-[.5rem] right-[.5rem] bg-[#fdeaec] text-center text-[1.5rem] font-bold rounded-full w-[40%] text-[#f86f7f]">
            5% Off
          </div>
        </article>
      </Link>
      <Link to="/itemsinfo">
        <article className="relative border-2 rounded-xl border-[#e6e9f0] p-10 flex flex-col gap-7">
          <div className="w-[90%]">
            <img src="/chat.png" alt="nft1-icon" />
          </div>
          <p className="text-[1.5rem] text-[#b2b2b5] font-bold">
            MacBook Air (M2) 2022 13
          </p>
          <div className="absolute top-[.5rem] right-[.5rem] bg-[#fdeaec] text-center text-[1.5rem] font-bold rounded-full w-[40%] text-[#f86f7f]">
            10% Off
          </div>
        </article>
      </Link>
    </section>
  );
}
