
import { useEffect, useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";
// import CreateMarketPlace from "./CreateMarketPlace";
// import ItemDisplay from "./ItemDisplay";
import PersonalItemDisplay from "./PersonalItemDisplay";
import { MARKETID } from "../requestsHandler";

export default function MarketPlace() {
  const [notify, setNotify] = useState({
    message: '',
    type: ''
  })

  const walletAddress = localStorage.getItem('walletAddress') || useCanvasWallet().walletAddress;

  const shyft = useCanvasWallet().marketSDK;

  const [userNfts, setUserNfts] = useState<any>([]);
  const [listings, setListings] = useState<any>([]);
  const [showPersonalNFTs, setShowPersonalNFTs] = useState(false);

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
      const listings = await shyft.marketplace.listing.active({ marketplaceAddress: MARKETID })
      setListings(listings);
    })()
  }, [walletAddress]);


  const getUserNFTs = async () => {
    const nfts = await shyft.nft.compressed.readAll({
      walletAddress: walletAddress
    })
    setUserNfts(nfts);
  }

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

      <div className="mb-3 flex flex-col  space-y-1">
        <div className="flex flex-row gap-x-3 font-bold text-[12px] divide-x">
          <p className="px-2 cursor-pointer hover:underline ">
            Listings
          </p>
          <p className="px-2 cursor-pointer hover:underline">
            My Listings
          </p>
          <p className="px-2 cursor-pointer hover:underline">
            New Item
          </p>
        </div>
        <hr />

        {listings.length ? <div></div> : <div className="text-[24px] h-[300px] flex flex-col justify-center items-center">No Items Listed Yet!
          <button onClick={() => {
            setShowPersonalNFTs(true);
            getUserNFTs();

          }} className="p-3 shadow text-black rounded-xl text-[1.5rem] font-semibold bg-[#fdefd7] btn btn-secondary">
            List New Items
          </button>
        </div>}
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


      {showPersonalNFTs &&
        <PersonalItemDisplay userNfts={userNfts} setShowPersonalNFTs={setShowPersonalNFTs} />
      }
    </main>
  );
}
