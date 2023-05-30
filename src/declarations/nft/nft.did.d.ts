import type { Principal } from '@dfinity/principal';
export interface NFT {
  'getCanisterId' : () => Promise<Principal>,
  'getContent' : () => Promise<Array<number>>,
  'getName' : () => Promise<string>,
  'getOwner' : () => Promise<Principal>,
}
export interface _SERVICE extends NFT {}
