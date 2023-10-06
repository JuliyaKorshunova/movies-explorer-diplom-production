import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <ul className="about-project__text-block">
          <li className="about-project__info">
            <h3 className="about-project__info-header">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__info-description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__info">
            <h3 className="about-project__info-header">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__info-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__time">
          <h3 className="about-project__time-header about-project__time-header_green">
            1 неделя
          </h3>
          <h3 className="about-project__time-header">4 недели</h3>
          <p className="about-project__time-description">Back-end</p>
          <p className="about-project__time-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
