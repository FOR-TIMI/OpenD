import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";

actor OpenD {

    public shared (msg) func mint(imageData : [Nat8], name : Text) : async Principal {
        let owner : Principal = msg.caller;

        Debug.print(debug_show (Cycles.balance()));
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, imageData);

        let newNFTPrincipal = await newNFT.getCanisterId();

        return newNFTPrincipal;
    };
};
