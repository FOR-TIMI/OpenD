import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react";
import { idlFactory } from "../../../declarations/nft/index";
import logo from "../../assets/logo.png";

function Item({ id }) {
  const [name, setName] = useState(null);
  const [owner, setOwner] = useState(null);
  const [content, setContent] = useState(null);

  const url = "http://127.0.0.1:8000/";
  const agent = new HttpAgent({ host: url });

  const loadNft = async () => {
    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: Principal.fromText(id),
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
  };

  useEffect(() => {
    loadNft();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={content}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
