import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import homeImage from "../../assets/home-img.png";
import Footer from "./Footer";
import Header from "./Header";
import Item from "./Item";

function App() {
  const nftId = "rrkah-fqaaa-aaaaa-aaaaq-cai";

  return (
    <div className="App">
      <Header />
      {/* <img className="bottom-space" src={homeImage} /> */}
      <Item id={nftId} />
      <Footer />
    </div>
  );
}

export default App;
