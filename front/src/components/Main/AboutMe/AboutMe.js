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
          <h4 className='about-me__info'>Фронтенд-разработчик</h4>
          <p className='about-me__description'>
            Я родилась в Кисловодске, живу в Москве. Я закончила факультет психологии Северо-Кавказского федерального университета. У меня есть муж и 2 детй.
            Я люблю слушать музыку. Недавно начала кодить. Сейчас планирую пройти карьерный трек и искать работу.
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
