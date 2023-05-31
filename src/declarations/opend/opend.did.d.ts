import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'getListedNFTs' : () => Promise<Array<Principal>>,
  'getNftPrice' : (arg_0: Principal) => Promise<bigint>,
  'getOpenDCanisterID' : () => Promise<Principal>,
  'getOriginalOwner' : (arg_0: Principal) => Promise<Principal>,
  'getOwnedNFTs' : (arg_0: Principal) => Promise<Array<Principal>>,
  'isListed' : (arg_0: Principal) => Promise<boolean>,
  'listNft' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
  'mint' : (arg_0: Array<number>, arg_1: string) => Promise<Principal>,
}
