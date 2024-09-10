import { useState } from "react";
import CustomInput from "./customInput/customInput";
import useCanvasWallet from "./CanvasWalletAdapter";

// import { listUserItem } from "../requestsHandler/requestsItems";
import { delegate, mplBubblegum } from '@metaplex-foundation/mpl-bubblegum'
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Helius } from "helius-sdk";
import { createNoopSigner, publicKey, publicKeyBytes, signerIdentity, } from "@metaplex-foundation/umi";

import { toWeb3JsTransaction } from '@metaplex-foundation/umi-web3js-adapters';
import { RPC } from "../requestsHandler";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { listUserItem } from "../requestsHandler/requestsItems";


const helius = new Helius("61c2ee69-b100-45d8-81e2-488dc6c4a5f0");

export default function NftDetails({ nft, buy, marketData }: any) {

  console.log(nft);
  const [showInputs, setShowInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fee, setFee] = useState('');

  const wallet = useCanvasWallet()

  const umi = createUmi(RPC).use(mplBubblegum())

  umi.use(mplCore())
  umi.use(mplToolbox())
  // umi.use(walletAdapterIdentity(wallet))
  // // Generate a new keypair signer.
  const signer = createNoopSigner(publicKey(wallet.walletAddress));

  // // Tell Umi to use the new signer.
  umi.use(signerIdentity(signer))


  const listItem = async () => {

    setLoading(true);
    const rpcAsset: any = await helius.rpc.getAsset({ id: nft.mint })
    const rpcAssetProof: any = await helius.rpc.getAssetProof({ id: nft.mint })

    try {

      let umiInstruction = await delegate(umi, {
        leafOwner: signer,
        previousLeafDelegate: signer.publicKey,
        newLeafDelegate: publicKey('CRpqwicZAaK5UsvgPFHPqYpJk39XbYAVkc2edkHAWPK1'),
        merkleTree: rpcAssetProof.tree_id,
        root: publicKeyBytes(rpcAssetProof.root),
        dataHash: publicKeyBytes(rpcAsset.compression.data_hash),
        creatorHash: publicKeyBytes(rpcAsset.compression.creator_hash),
        nonce: rpcAsset.compression.leaf_id,
        index: rpcAssetProof.node_index - 2 ** rpcAssetProof.proof.length,
        proof: rpcAssetProof.proof,
      }).getInstructions();

      const transaction = umi.transactions.create({
        version: 0,
        blockhash: (await umi.rpc.getLatestBlockhash()).blockhash,
        instructions: umiInstruction,
        payer: signer.publicKey,
      })

      let webTransaction = toWeb3JsTransaction(transaction)
      // umiInstruction.map((trans) => tx.add(trans));
      let txHash = await wallet.signTransaction(webTransaction)


      if (txHash) {
        const response = await listUserItem(fee, signer.publicKey, nft.mint);
        if (response) {
          console.log('NFT successfully listed:', response);
          setLoading(false);
          setShowInputs(false);
        }
      } else {
        console.log('Failed to sign transaction')
        setLoading(false);
      }



    } catch (e: any) {
      console.log(e)
      setLoading(false);
    }


  }

  const buyItemTransaction = async () => {
    setLoading(true);
  }


  return (
    <section>
      <div className="w-[100%] overflow-hidden h-[400px] rounded-xl" style={{ objectFit: 'cover' }}>
        <img className="w-[100%] h-[100%]" src={nft?.image_uri} style={{ objectFit: 'cover' }} alt="nft1-icon" />
      </div>
      <div className="w-[100%] p-2 py-3 flex flex-row justify-between">
        <p className="text-[#fdefd8] text-[14px] font-bold">{nft?.name}</p>
      </div>

      {nft?.attributes_array.length && nft?.attributes_array.map((attr: any, index: number) => {
        return (
          <div key={index} className="p-2 w-[100%] flex justify-between items-center gap-2">
            <p>{attr?.trait_type}: {attr?.value}</p>
          </div>
        )
      })}

      <div className="p-2 w-[100%] flex flex-col justify-center items-center">

        {showInputs &&
          <div>

            <CustomInput type="number"
              className="mb-3"
              name="fee"
              label="Fee for Transactions"
              placeholder="enter transaction fee"
              onChange={(e: any) => setFee(e.target.value)}
            />


          </div>
        }
        {buy ?
          <button onClick={() => buyItemTransaction()} className="p-3 rounded-xl w-10/12 text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
            {loading ? "Loading..." : <>
              Buy {marketData?.fee}
            </>
            }
          </button>
          :
          <button onClick={() => showInputs ? listItem() : setShowInputs(true)
          } className="p-3 rounded-xl w-10/12 text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
            {loading ? "Loading..." : <>
              {showInputs ? "Proceed" : "List Item"}
            </>
            }
          </button>

        }
      </div>
    </section>
  );
}
