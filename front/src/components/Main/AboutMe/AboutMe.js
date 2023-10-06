import React from 'react';
import avatar from '../../../images/my-photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__text-block'>
          <h3 className='about-me__subtitle'>Юлия Коршунова</h3>
          <h4 className='about-me__info'>Фронтенд-разработчик, 36 лет</h4>
          <p className='about-me__description'>
            Я родилась и живу в Саратове, закончила факультет экономики СГУ. У меня есть муж, сын и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начала кодить. С 2015 года
            работала в компании «СКБ Контур». После того, как прошла курс по веб-разработке, начала
            заниматься фриланс-заказами и ушла с постоянной работы.
          </p>
          <a
            href='https://github.com/JuliyaKorshunova'
            className='about-me__link'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img src={avatar} alt='мое фото' className='about-me__photo' />
      </div>
    </section>
  );
}

export default AboutMe;
