import React, { useState } from "react";
import "../App.css";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { AiFillAlipayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Welcome() {
  const { t } = useTranslation();
  return (
    <header className="App-header">
      <AiFillAlipayCircle className="App-logo" />
      <h1 className="App-link">NUNTIUS</h1>
      <Link to="/browse">
        <BsFillChatQuoteFill />
        {t("start")}
      </Link>
      <Link to="#login">{t("login")}</Link>
      <Link to="#register">{t("register")}</Link>
    </header>
  );
}

export default Welcome;
