import { CiSearch } from "react-icons/ci";
import { VscListFilter } from "react-icons/vsc";
import { FaMapMarkerAlt } from "react-icons/fa";
import Categories from "./Categories";
import ItemDisplay from "./ItemDisplay";
import FlashSale from "./FlashSale";

export default function Main() {
  return (
    <main className="pt-[3rem] pb-[5rem]">
      {/* Search Input */}
      <article className="flex gap-3 w-full items-center border border-[#dfe2ec] py-[1rem] px-[1.5rem] rounded-2xl">
        <CiSearch className="text-[3rem] text-[#a4a8b5]" />
        <input
          type="text"
          placeholder="Find your needed"
          className=" text-[1.2rem] input input-bordered w-full outline-none border-r border-[#dfe2ec]"
        />
        <VscListFilter className="text-[3rem] text-[#a4a8b5]" />
      </article>

      {/* Delivery Location */}
      <article className="mt-7 flex items-center gap-2">
        <FaMapMarkerAlt className="text-[2rem] text-orange-600" />
        <p className="text-[1.2rem]">
          <span className="text-[#abafbb]">Deliver to </span>
          JI.Rose No. 123 Block A, Cipete Sub-District.
        </p>
      </article>

      {/* Categories */}
      <Categories />

      <FlashSale />
      <ItemDisplay />
    </main>
  );
}
