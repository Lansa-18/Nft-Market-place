import NFTMint from "./NftMint";
import { useEffect, useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";
import CreateMarketPlace from "./CreateMarketPlace";
import ItemDisplay from "./ItemDisplay";
import PersonalItemDisplay from "./PersonalItemDisplay";
import { Network, ShyftSdk } from "@shyft-to/js";

export default function Main() {
  const [startMint, _setStartMint] = useState(false)
  const [showMarketPlace, setShowMarketPlace] = useState(false)
  const [nftItem, _setNftItems] = useState<any>([]);
  const [notify, setNotify] = useState({
    message: '',
    type: ''
  })

  const walletAddress = useCanvasWallet().walletAddress;

  // const canvasAdapter: any = useCanvasWallet()

  const shyft = new ShyftSdk({ apiKey: 'YJ4c0DNAEQK90NJn', network: Network.Mainnet });

  const [userNfts, setUserNfts] = useState<any>([]);


  useEffect(() => {
    if (!walletAddress) {
      setNotify({
        message: 'Please connect your wallet to use application',
        type: 'error',
      })
      setTimeout(() => {
        setNotify({
          message: '',
          type: ''
        })
      }, 2000)
      return;
    }
    (async () => {
      // const balance = await shyft.wallet.getBalance({ wallet: '13dqNw1su2UTYPVvqP6ahV8oHtghvoe2k2czkrx9uWJZ' })
      // console.log('Balance:', balance);

      const nfts = await shyft.nft.compressed.readAll({
        walletAddress: walletAddress
      })
      setUserNfts(nfts);

    })()
  }, []);


  // const anchorProvider = canvasAdapter && new AnchorProvider(connection, canvasAdapter, {});
  // if (!anchorProvider) {
  //   return;
  // }
  // const programId = new PublicKey("H6PPjzSYdCTwCN2KEU6iumCDzUZsTS5fxQh6zFerEfQN");
  // const program = new Program<MarketplaceIDL>(IDL, programId, anchorProvider);

  // const fetchItems = async () => {
  //   let listitems = await program.account.listing.all();
  //   setNftItems(listitems);

  // }
  return (

    <main className="pt-[3rem] pb-[5rem] text-white">
      <div className="flex flex-row justify-center items-center">

        {notify.type !== '' &&
          <div className={`${notify.type == "success" ? 'bg-green-500' : "bg-red-500"} w-[400px] shadow rounded-lg  p-3 absolute top-20`}>
            <p className='text-center'>{notify.message}</p>
          </div>
        }
      </div>

      <div className="mb-3 flex flex-col justify-center items-center space-y-1">
        <p className="camar-text text-[20px]">welcome to</p>
        <h2 className="text-[100px] text-[#fdefd8] text-center font-extrabold camar-text">D-Grovv</h2>
        <p className="text-[18px]   text-center camar-text w-6/12">
          Create custom marketplace for your NFT's
        </p>

        {/* <p className="text-[18px] mb-3">CA:H6PPjzSYdCTwCN2KEU6iumCDzUZsTS5fxQh6zFerEfQN</p> */}

        <div className="flex flex-row  p-2 justify-center gap-x-2">

          <button onClick={() => { }} className="p-3 shadow text-black rounded-xl text-[1.5rem] font-semibold bg-[#fdefd7] btn btn-secondary">
            Create Your Own Market Place
          </button>

          <button onClick={() => { }} className="p-3 rounded-xl text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
            Your Items
          </button>

        </div>
      </div>
      {/* Search Input */}
      {/* <article className="flex gap-3 w-full items-center border border-[#dfe2ec] py-[1rem] px-[1.5rem] rounded-2xl">
        <CiSearch className="text-[3rem] text-[#a4a8b5]" />
        <input
          type="text"
          placeholder="looking for items?"
          className=" text-[1.2rem] input bg-black text-dark input-bordered w-full outline-none border-[#dfe2ec]"
        />
      </article> */}

      {startMint &&
        <NFTMint />
      }

      {showMarketPlace &&
        <CreateMarketPlace setShowMarketPlace={setShowMarketPlace} />
      }

      {/* Delivery Location
      <article className="mt-7 flex items-center gap-2">
        <FaMapMarkerAlt className="text-[2rem] text-orange-600" />
        <p className="text-[1.2rem]">
          <span className="text-[#abafbb]">Deliver to </span>
          JI.Rose No. 123 Block A, Cipete Sub-District.
        </p>
      </article> */}

      {/* Categories */}
      {/* <Categories /> */}


      {nftItem.length > 0 ?
        <ItemDisplay />
        :
        <></>
      }


      <PersonalItemDisplay userNfts={userNfts} />

    </main>
  );
}
