import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Array "mo:base/Array";

actor OpenD {

    //Custom type To keep track of all sales of an nft
    private type Listing = {
        nftOwner : Principal;
        nftPrice : Nat;
    };

    var NFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash); //TO store all NFTs for discover page
    var owners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash); // to store list of NTFS to one user
    var listings = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

    public shared (msg) func mint(imageData : [Nat8], name : Text) : async Principal {
        let owner : Principal = msg.caller;

        Debug.print(debug_show (Cycles.balance()));
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, imageData);

        let newNFTPrincipal = await newNFT.getCanisterId();

        //ADD New Nft to list of NFTs
        NFTs.put(newNFTPrincipal, newNFT);

        //To update the list of nfts and a user's NFTs
        addToOwner(owner, newNFTPrincipal);

        return newNFTPrincipal;
    };

    private func addToOwner(owner : Principal, nftId : Principal) {
        var ownedNFTs : List.List<Principal> = switch (owners.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        ownedNFTs := List.push(nftId, ownedNFTs);
        owners.put(owner, ownedNFTs);

    };

    public query func getOwnedNFTs(user : Principal) : async [Principal] {
        let ownedNfts : List.List<Principal> = switch (owners.get(user)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        return List.toArray(ownedNfts);
    };

    public shared (msg) func listNft(id : Principal, price : Nat) : async Text {
        //Find NFT
        let nft : NFTActorClass.NFT = switch (NFTs.get(id)) {
            case null return "NFT does not exist.";
            case (?result) result;
        };

        //Find the owner of the NFT
        let owner = await nft.getOwner();

        //Make sure only the owner can sell;
        if (Principal.equal(owner, msg.caller)) {
            // Create new listing
            let newListing : Listing = {
                nftOwner = owner;
                nftPrice = price;
            };

            //Add listing to the list of listings
            listings.put(id, newListing);

            return "NFT Listed Successfully";
        } else {
            return "This NFT belongs to someone else.";
        };

    };

    public query func getOpenDCanisterID() : async Principal {
        return Principal.fromActor(OpenD);
    };

};
