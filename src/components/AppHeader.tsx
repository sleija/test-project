import logo from "../logo.svg";
import React from "react";
import "./AppHeader.css";

export default function AppHeader(): JSX.Element {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      Inventory
    </header>
  );
}
