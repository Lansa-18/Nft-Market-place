import { request } from "../request"

export const fetchMagicEdenCollections = async () => {
    let response = await request.get('https://api-mainnet.magiceden.dev/v2/collections');
    return response;
}