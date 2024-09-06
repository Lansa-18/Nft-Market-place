
import { useState } from "react";
import NftDetails from "./NftDetails";

export default function PersonalItemDisplay({ userNfts, setShowPersonalNFTs }: any) {

  const [showItem, setShowItem] = useState(false);
  const [selectedNft, setSelectedNft] = useState<any>(null);

  return (
    <div className="bg-black/50 left-0 h-screen overflow-scroll w-screen top-0 fixed">
      <div className="font-bold bg-[#e53d75] p-2 rounded-lg absolute z-50 top-5 right-[50%] text-[20px] text-red-200 cursor-pointer" onClick={() => setShowPersonalNFTs(false)}>Close</div>
      <section className="absolute top-0 h-fit overflow-scroll  left-0 p-20 grid grid-cols-5 gap-4 mt-[3rem]">
        {userNfts.length > 0 ?
          userNfts.map((nft: any, index: number) => {
            return (
              <article key={index} onClick={() => {
                setSelectedNft(nft)
                setShowItem(true);
              }} className="relative bg-black/80 rounded-xl border-[#e6e9f0] overflow-hidden flex flex-col">
                <div className="w-[100%] overflow-hidden h-[100px]" style={{ objectFit: 'cover' }}>
                  <img className="w-[100%] h-[100%]" src={nft.image_uri} style={{ objectFit: 'cover' }} alt="nft1-icon" />
                </div>
                <div className="w-[100%] p-2 py-3 flex flex-row justify-between">
                  <p className="text-[#fdefd8] text-[8px] font-bold">{nft.name}</p>
                </div>
                <div className="p-2 w-[100%] flex justify-center items-center">
                  <button onClick={() => {
                    setSelectedNft(nft)
                    setShowItem(true);
                  }} className="p-2 text-[8px] rounded-xl w-10/12 text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
                    View
                  </button>
                </div>
              </article>
            )
          })
          :
          // <div className="text-center w-screen left-0 flex flex-row justify-center items-center">
          <p className="text-[#fdefd8]  w-[100%] border text-[20px] font-bold">No NFTs found!</p>
          // </div>
        }

      </section>


      {showItem &&
        <div className="absolute h-fit w-screen top-0 left-0 bg-black/50 p-20 flex flex-row justify-center items-center">
          <div className="h-[50%] w-[60%] relative -top-[20%] p-3 px-5 bg-black rounded-xl">
            <p className="text-[30px] cursor-pointer" onClick={() => setShowItem(false)}>x</p>
            <NftDetails nft={selectedNft} />
          </div>

        </div>
      }
    </div>

  );
}
