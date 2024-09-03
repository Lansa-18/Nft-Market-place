import { FaRegHeart } from "react-icons/fa6";

export default function NftDetails() {
  return (
    <section>
      <div className="mt-[5rem] flex justify-center items-center border-red-950">
        <img className="w-[65%]" src="/chat.png" alt="nft-image" />
      </div>
      <article className="flex flex-col gap-[1.5rem]">
        <div className="flex justify-between items-center">
          <h4 className="text-[2rem]">Ipad Pro 6th Generation 13 Inch 2022</h4>
          <FaRegHeart className="text-[2rem]" />
        </div>
        <div className="flex items-center gap-[2rem]">
          <h2 className="text-[2.3rem] font-bold">IDR 15,299.000</h2>
          <p className="bg-light-pink text-light-red py-2 w-[20%] text-center rounded-full font-bold text-[1.6rem]">
            6% Off
          </p>
        </div>
        <p className="text-[1.7rem] line-through text-[#c5c8d0]">IDR 16.999.000</p>
        <div className="flex flex-col gap-5">
          <h2 className="text-[2rem] font-semibold">Description Product</h2>
          <p className="text-[1.5rem] text-[#c0c2cb]">
            Ipad Pro 6th generation offers high performance with an Apple M2
            chip, Liquid Retina Designed to be slim and light, this tablet
            supports 5G networks...
            <span className="text-orange font-semibold">Read more</span>
          </p>
        </div>
      </article>
    </section>
  );
}
