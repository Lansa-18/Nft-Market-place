import { request } from "../request"

export const fetchMagicEdenCollections = async () => {
    let response = await request.get('https://api-mainnet.magiceden.dev/v2/collections');
    return response;
}

//working
export const fetchMarketPlace = async () => {
    let response = await request.get('https://blinks.ytechno.com.ng/api/get-marketplace');
    return response;
}

//working
export const fetchListings = async () => {
    let response = await request.get('https://blinks.ytechno.com.ng/api/get-listings');
    return response;
}

//working
export const fetchUserListings = async (userAddresss: string) => {
    let response = await request.get(`https://blinks.ytechno.com.ng/api/get-user-listings/${userAddresss}`);
    return response;
}


export const getListedItem = async (nft_mint: string) => {
    let response = await request.get(`https://blinks.ytechno.com.ng/api/get-listed-item/${nft_mint}`)
    return response;
}

export const listUserItem = async (price: string, owner: string, asset: string) => {
    let bodyContent = new FormData();
    bodyContent.append("asset_mint", asset);
    bodyContent.append("fee", price.toString());
    bodyContent.append("owner", owner);

    let response = await request.post({ url: 'https://blinks.ytechno.com.ng/api/list-new-item', data: bodyContent })
    return response;
}


export const unlistItem = async (mint: string) => {
    let response = await request.get(`https://blinks.ytechno.com.ng/api/unlist/${mint}`)
    return response;
}
