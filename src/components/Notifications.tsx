import { useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";


export default function Notifications() {
  const wallet = useCanvasWallet()
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      let itemConnected = await wallet.connectWallet();
      if (itemConnected) {
        setConnected(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='flex items-center'>
      <button onClick={() => {
        connectWallet();
      }} className="text-white w-fit p-2 rounded-xl text-[1.5rem] font-semibold shadow hover:bg-[#e53d75]/90 bg-[#e53d75]">
        {connected ? "Connected" : "Connect Wallet"}
      </button>
    </div>
  )
}
