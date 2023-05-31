import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react";
import { idlFactory } from "../../../declarations/nft/index";
import { opend } from "../../../declarations/opend/index";
import Button from "./Button";

function Item({ id }) {
  const [name, setName] = useState(null);
  const [owner, setOwner] = useState(null);
  const [content, setContent] = useState(null);
  const [button, setButton] = useState(null);
  const [priceInput, setPriceInput] = useState(null);
  const [sellStatus, setSellStatus] = useState("");
  const [blur, setBlur] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const url = "http://127.0.0.1:8000/";
  const agent = new HttpAgent({ host: url });

  //TODO: Remove this line when deploying the project live
  agent.fetchRootKey();

  let NFTActor;

  const loadNft = async () => {
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    const contentUnit8Array = await NFTActor.getContent();

    const imageContent = new Uint8Array(contentUnit8Array);

    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png" })
    );

    setName(name);
    setOwner(owner.toText());
    setContent(image);

    const nftIsListed = await opend.isListed(id);

    if (nftIsListed) {
      setOwner("opend");
      setBlur({ filter: "blur(4px)" });
      setSellStatus("Listed");
    } else {
      setButton(<Button handleClick={handleSell} text="Sell" />);
    }
  };

  let price;

  const handleSell = () => {
    setPriceInput(
      <input
        placeholder="Price in DERI"
        type="number"
        className="price-input"
        value={price}
        onChange={(e) => (price = e.target.value)}
      />
    );

    setButton(<Button handleClick={sellItem} text="Confirm" />);
  };

  const sellItem = async () => {
    setBlur({ filter: "blur(4px)" });
    setPriceInput();
    setIsLoading(true);

    try {
      const result = await opend.listNft(id, Number(price));

      if (result.trim() === "NFT Listed Successfully") {
        const openDCanisterId = await opend.getOpenDCanisterID();

        //To transfer ownership to OpenD once NFT is listed
        const result = await NFTActor.transferOwnership(openDCanisterId); // "Transferred Successfully"

        console.log(result);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
      setButton();
      setOwner("OpenD");
    }
  };

  useEffect(() => loadNft(), []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={content}
          style={blur}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"> {sellStatus}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {!isLoading ? (
            <>
              {priceInput}
              {button}
            </>
          ) : (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
