import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";
import ItemInfos from "./pages/ItemInfos";
import MyCart from "./pages/MyCart";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="checkout" element={<Checkout/>} />
        <Route path="iteminfo" element={<ItemInfos />} />
        <Route path="mycart" element={<MyCart />}  />
        <Route path="checkout" element={<Checkout/>} />
      </Routes>
    </BrowserRouter>
  )
}
