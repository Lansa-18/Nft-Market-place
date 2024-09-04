import { useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";


export default function Notifications() {
  const anchorWallet = useCanvasWallet()
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (anchorWallet) {
      try {
        const response = await anchorWallet.connectWallet()
        console.log(response);
        setConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Canvas Wallet not initialized');
    }
  }
  return (
    <div className='flex items-center'>
      <button onClick={() => connectWallet()} className="text-white w-[200px] py-[1rem] rounded-xl text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
        {connected ? "Connected" : "Connect Wallet"}
      </button>
    </div>
  )
}
