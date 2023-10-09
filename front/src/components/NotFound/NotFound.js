import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <section className='not-found'>
      <main className='not-found__box'>
        <div className='not-found__error-type'>
          <h1 className='not-found__title'>404</h1>
          <p className='not-found__subtitle'>Страница не&nbsp;найдена</p>
        </div>
        <Link to='/' className='not-found__back-link link'>
          Назад
        </Link>
      </main>
    </section>
  );
}

export default NotFound;
