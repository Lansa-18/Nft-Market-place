import { useState } from "react";
import CustomInput from "./customInput/customInput";
import useCanvasWallet from "./CanvasWalletAdapter";

// import { listUserItem } from "../requestsHandler/requestsItems";
import { delegate, mplBubblegum } from '@metaplex-foundation/mpl-bubblegum'
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Helius, RpcClient } from "helius-sdk";
import { generateSigner, publicKey, publicKeyBytes, signerIdentity, sol } from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { toWeb3JsInstruction, toWeb3JsTransaction } from '@metaplex-foundation/umi-web3js-adapters';
import { Transaction, clusterApiUrl } from "@solana/web3.js";
import { RPC } from "../requestsHandler";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";
import { mplCore } from "@metaplex-foundation/mpl-core";


const helius = new Helius("61c2ee69-b100-45d8-81e2-488dc6c4a5f0");

export default function NftDetails({ nft }: any) {
  const [showInputs, setShowInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_fee, setFee] = useState('');


  const wallet = useCanvasWallet()

  const umi = createUmi(RPC).use(mplBubblegum())
  umi.use(mplCore())
  umi.use(walletAdapterIdentity(wallet))

  // Generate a new keypair signer.
  const signer = generateSigner(umi)

  // Tell Umi to use the new signer.
  umi.use(signerIdentity(signer))


  const listItem = async () => {

    setLoading(true);
    // const rpcAsset: any = await helius.rpc.getAsset({ id: nft.mint })
    // const rpcAssetProof: any = await helius.rpc.getAssetProof({ id: nft.mint })

    try {

      let tx = new Transaction()


      const umiInstruction = transferSol(umi, {
        source: signer,
        destination: publicKey('CRpqwicZAaK5UsvgPFHPqYpJk39XbYAVkc2edkHAWPK1'),
        amount: sol(0.005),
      }).getInstructions().map(toWeb3JsInstruction);

      // let instruction = await delegate(umi, {
      //   leafOwner: signer,
      //   previousLeafDelegate: signer.publicKey,
      //   newLeafDelegate: publicKey('CRpqwicZAaK5UsvgPFHPqYpJk39XbYAVkc2edkHAWPK1'),
      //   merkleTree: rpcAssetProof.tree_id,
      //   root: publicKeyBytes(rpcAssetProof.root),
      //   dataHash: publicKeyBytes(rpcAsset.compression.data_hash),
      //   creatorHash: publicKeyBytes(rpcAsset.compression.creator_hash),
      //   nonce: rpcAsset.compression.leaf_id,
      //   index: rpcAssetProof.node_index - 2 ** rpcAssetProof.proof.length,
      //   proof: rpcAssetProof.proof,
      // }).getInstructions().map(toWeb3JsInstruction)


      // // // instruction.setLatestBlockhash(umi)
      // // // instruction.build(umi);

      // // console.log(web3jsTransaction);

      // // Create a new instruction (like a core nft transfer)
      // // Convert it using the UmiWeb3jsAdapters Package
      // // const web3jsInstruction = instruction.map(toWeb3JsInstruction);
      umiInstruction.map((trans) => tx.add(trans))
      // // Sign the transaction with the wallet adapter
      await wallet.signMainTransaction(tx);
      setLoading(false);
    } catch (e: any) {
      console.log(e)
      setLoading(false);
    }
    /** 
    const response = await listUserItem(fee, walletAddress, nft.mint);
*/

  }
  return (
    <section>
      <div className="w-[100%] overflow-hidden h-[400px] rounded-xl" style={{ objectFit: 'cover' }}>
        <img className="w-[100%] h-[100%]" src={nft.image_uri} style={{ objectFit: 'cover' }} alt="nft1-icon" />
      </div>
      <div className="w-[100%] p-2 py-3 flex flex-row justify-between">
        <p className="text-[#fdefd8] text-[14px] font-bold">{nft.name}</p>
      </div>

      {nft.attributes_array.length && nft.attributes_array.map((attr: any, index: number) => {
        return (
          <div key={index} className="p-2 w-[100%] flex justify-between items-center gap-2">
            <p>{attr.trait_type}: {attr.value}</p>
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
        <button onClick={() => showInputs ? listItem() : setShowInputs(true)
        } className="p-3 rounded-xl w-10/12 text-[1.5rem] font-semibold bg-[#e53d75] btn btn-secondary">
          {loading ? "Loading..." : <>
            {showInputs ? "Proceed" : "List Item"}
          </>
          }
        </button>
      </div>
    </section>
  );
}
