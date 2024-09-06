import { useState } from "react";
import CustomInput from "./customInput/customInput";
import useCanvasWallet from "./CanvasWalletAdapter";
import { MARKETID } from "../requestsHandler";

export default function NftDetails({ nft }: any) {
  const [showInputs, setShowInputs] = useState(false);
  const [fee, setFee] = useState('');
  const shyft = useCanvasWallet().marketSDK;
  const walletAddress = useCanvasWallet().walletAddress;

  const listItem = async () => {
    console.log(nft, walletAddress)
    const { encoded_transaction } = await shyft.marketplace.listing.list(
      {
        marketplaceAddress: MARKETID,
        nftAddress: nft.mint,
        price: 50,
        sellerWallet: walletAddress,
        isGasLess: true,
      }

    )

    console.log(encoded_transaction);
  }
  return (
    <section>
      <div className="w-[100%] overflow-hidden h-[400px] rounded-xl" style={{ objectFit: 'cover' }}>
        <img className="w-[100%] h-[100%]" src={nft.image_uri} style={{ objectFit: 'cover' }} alt="nft1-icon" />
      </div>
      <div className="w-[100%] p-2 py-3 flex flex-row justify-between">
        <p className="text-[#fdefd8] text-[14px] font-bold">{nft.name}</p>
      </div>

      {nft.attributes_array.length && nft.attributes_array.map((attr: any, index: number) => {
        return (
          <div key={index} className="p-2 w-[100%] flex justify-between items-center gap-2">
            <p>{attr.trait_type}: {attr.value}</p>
          </div>
        )
      })}

      <div className="p-2 w-[100%] flex flex-col justify-center items-center">

        {showInputs &&
          <div>

            <CustomInput type="number"
              className="mb-3"
              label="Fee for Transactions"
              placeholder="enter transaction fee"
              onChange={(e: any) => setFee(e.target.value)}
            />
          </div>
        }
        <button onClick={() => showInputs ? listItem() : setShowInputs(true)
        } className="p-3 rounded-xl w-10/12 text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
          {showInputs ? "Proceed" : "List Item"}
        </button>
      </div>
    </section>
  );
}
