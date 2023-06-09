import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { opend } from "../../../declarations/opend/index";
import homeImage from "../../assets/home-img.png";
import logo from "../../assets/logo.png";
import CURRENT_USER_ID from "../index";
import Gallery from "./Gallery";
import Minter from "./Minter";

function Header() {
  const [userNFTs, setUserNfts] = useState(null);
  const [listedNftGallery, setListedNftGallery] = useState(null);

  const getNfts = async () => {
    const userNFTIds = await opend.getOwnedNFTs(CURRENT_USER_ID);
    setUserNfts(<Gallery ids={userNFTIds} title="My Nfts" role="collection" />);

    const listedNFTIds = await opend.getListedNFTs();
    setListedNftGallery(
      <Gallery ids={listedNFTIds} title="Discover" role="discover" />
    );
  };

  // Get user's list of NFTs
  useEffect(() => getNfts(), []);

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <img className="header-logo-11" src={logo} />
            <div className="header-vertical-9"></div>
            <Link to="/">
              <h5 className="Typography-root header-logo-text">OpenD</h5>
            </Link>
            <div className="header-empty-6"></div>
            <div className="header-space-8"></div>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/discover">Discover</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/minter">Minter</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/collection">My NFTs</Link>
            </button>
          </div>
        </header>
      </div>

      <Switch>
        <Route path="/discover">{listedNftGallery}</Route>

        <Route path="/minter">
          <Minter />
        </Route>

        <Route path="/collection">{userNFTs}</Route>

        <Route path="*">
          <img src={homeImage} className="bottom-space" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Header;
