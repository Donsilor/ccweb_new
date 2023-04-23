import React from 'react';
import Router from 'routes';
import './style.less';

export default function Main(props) {
  return (
    <div className="main">
      <section className="content">
        <Router />
      </section>
    </div>
  );
}
