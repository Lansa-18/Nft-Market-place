import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";
import ItemInfos from "./pages/ItemInfos";
import MyCart from "./pages/MyCart";
import { useEffect, useRef, useState } from "react";
import { isIframe } from "./canvas-adapter";
import { CanvasClient } from "@dscvr-one/canvas-client-sdk";
import { CanvasWalletProvider } from "./components/CanvasWalletAdapter";

export default function App() {
  const iframe = isIframe();
  const canvasClientRef = useRef<CanvasClient | undefined>();
  const [_, setIsInIframe] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iframe) {
      canvasClientRef.current = new CanvasClient();
    };
    setIsInIframe(iframe);

    const resizeObserver = new ResizeObserver((_) => {
      canvasClientRef?.current?.resize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [])

  return (
    <CanvasWalletProvider>
      <div ref={containerRef} className="bg-[#42a3ba]">
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="iteminfo" element={<ItemInfos />} />
            <Route path="mycart" element={<MyCart />} />
            <Route path="checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CanvasWalletProvider>

  )
}
