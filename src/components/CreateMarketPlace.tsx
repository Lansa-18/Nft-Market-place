import CustomInput from "./customInput/customInput";
export default function CreateMarketPlace({ setShowMarketPlace }: any) {




    return (
        <section className='h-screen absolute top-0 left-0 z-50 bg-white/30 w-full flex flex-col justify-center items-center'>

            <div className=" bg-black rounded-xl w-[50%] p-5">
                <div className="flex flex-row justify-end w-[100%]">
                    <button onClick={() => setShowMarketPlace(false)}>X</button>
                </div>

                <CustomInput type="text"
                    className="mb-3"
                    label="Market Place Name"
                    placeholder="enter name for marketplace"
                />
                <CustomInput type="number"
                    className="mb-3"
                    label="Fee for Transactions"
                    placeholder="enter transaction fee"
                />

                <button onClick={() => { }} className="object-center w-full py-[1rem] rounded-xl text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
                    Create
                </button>

            </div>

            {/* <article className='flex justify-between'>
                <div className='w-[23%]'>
                    <img src="/stak-logo2.png" alt="cart-item" />
                </div>
                <div className='flex flex-col'>
                    <p className='text-[1.6rem] font-semibold leading-none'>Apple Watch Ultra 2 with Ocean Band</p>
                    <p className='text-[2rem] font-bold'>IDR 15.999.000</p>

                </div>
            </article> */}
        </section>
    )
}
