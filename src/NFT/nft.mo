import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

//Contract for NFT
actor class NFT(name : Text, owner : Principal, content : [Nat8]) {

    let itemName = name;
    let nftOwner = owner;
    let imageBytes = content;

    public query func getName() : async Text {
        return itemName;
    };

    public query func getOwner() : async Principal {
        return nftOwner;
    };

    public query func getContent() : async [Nat8] {
        return imageBytes;
    };

};
