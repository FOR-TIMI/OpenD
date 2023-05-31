import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

//Contract for NFT
actor class NFT(name : Text, owner : Principal, content : [Nat8]) = this {

    private let itemName = name;
    private var nftOwner = owner;
    private let imageBytes = content;

    public query func getName() : async Text {
        return itemName;
    };

    public query func getOwner() : async Principal {
        return nftOwner;
    };

    public query func getContent() : async [Nat8] {
        return imageBytes;
    };

    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    public shared (msg) func transferOwnership(newOwnerId : Principal) : async Text {

        if (msg.caller == nftOwner) {
            nftOwner := newOwnerId;
            return "Transferred Successfully";
        } else {
            return "Error: This NFT belongs to someone else";
        };

    };
};
