
import { Link } from "react-router-dom";

export default function PersonalItemDisplay({ userNfts }: any) {


  return (
    <section className="grid grid-cols-4 gap-4 mt-[3rem]">
      {userNfts.length > 0 && userNfts.map((nft: any, index: number) => {
        return (
          <Link key={index} to="/">
            <article className="relative border rounded-xl border-[#e6e9f0] overflow-hidden flex flex-col">
              <div className="w-[100%]">
                <img src={nft.image_uri} alt="nft1-icon" />
              </div>
              <div className="w-[100%] p-2 py-3">
                <p className="text-[#fdefd8] text-[20px] font-bold">{nft.name}</p>
                <p className="text-[#fdefd8] text-[20px] font-bold">{nft.symbol}</p>

              </div>
              <div className="p-2 w-[100%]">
                <button onClick={() => { }} className="p-3 rounded-xl w-[10/12] text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
                  View
                </button>
              </div>
              {/* <div className="absolute top-[.5rem] right-[.5rem] bg-[#fdeaec] text-center text-[1.5rem] font-bold rounded-full w-[40%] text-[#f86f7f]">
                5% Off
              </div> */}
            </article>
          </Link>
        )
      })}
    </section>
  );
}
