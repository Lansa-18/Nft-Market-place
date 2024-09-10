import NFTMint from "./NftMint";
import { useEffect, useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";
import CreateMarketPlace from "./CreateMarketPlace";
import ItemDisplay from "./ItemDisplay";
import { Link } from "react-router-dom";

export default function Main() {
  const [startMint, _setStartMint] = useState(false)
  const [showMarketPlace, setShowMarketPlace] = useState(false)
  const [nftItem, _setNftItems] = useState<any>([]);
  const [notify, setNotify] = useState({
    message: '',
    type: ''
  })

  const walletAddress = localStorage.getItem('walletAddress') || useCanvasWallet().walletAddress;

  const shyft = useCanvasWallet().marketSDK;

  const [_userNfts, setUserNfts] = useState<any>([]);


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
      const nfts = await shyft.nft.compressed.readAll({
        walletAddress: walletAddress
      })
      setUserNfts(nfts);

    })()
  }, [walletAddress]);

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

        <div className="flex flex-row  p-2 justify-center gap-x-2">

          <Link to="/market-place" className="p-3  shadow text-white rounded-xl text-[1.5rem] font-semibold hover:bg-[#e53d75]/90 bg-[#e53d75]">
            Enter Market Place
          </Link>
        </div>
      </div>


      {startMint &&
        <NFTMint />
      }

      {showMarketPlace &&
        <CreateMarketPlace setShowMarketPlace={setShowMarketPlace} shyft={shyft} />
      }


      {nftItem.length > 0 ?
        <ItemDisplay />
        :
        <></>
      }

    </main>
  );
}
