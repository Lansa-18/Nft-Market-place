import { FiBell, FiShoppingBag } from "react-icons/fi";

export default function Notifications() {
  return (
    <div className='flex items-center gap-5'>
        <article className='border-2 border-[#e1e4ec] p-3 rounded-lg relative'>
            <FiShoppingBag className='text-[2rem] text-[#bbbdc7]' />
            <div className="bg-red-600 rounded-full w-[.7rem] h-[.7rem] absolute top-[.65rem] left-[2.1rem]"></div>
        </article>
        <article className='border-2 border-[#e1e4ec] p-3 rounded-lg relative'>
            <FiBell className='text-[2rem] text-[#bbbdc7]'/>
            <div className="bg-red-600 rounded-full w-[.7rem] h-[.7rem] absolute top-[.65rem] left-[1.9rem]"></div>
        </article>
    </div>
  )
}
