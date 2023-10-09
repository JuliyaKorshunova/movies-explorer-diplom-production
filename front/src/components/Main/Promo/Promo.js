import React from "react";
import NavTab from "../NavTab/NavTab";
import "./Promo.css";
import landingLogo from "../../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text-block">
          <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img className="promo__image" src={landingLogo} alt="изображение" />

        <NavTab />
      </div>
    </section>
  );
}

export default Promo;
