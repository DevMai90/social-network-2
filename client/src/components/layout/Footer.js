import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <p className="px text-light">Created by David Mai</p>
      <a
        href="http://david-mai.com"
        className="px text-light"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fas fa-globe" />
      </a>
      <a
        href="https://github.com/DevMai90"
        className="px text-light"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-github" />
      </a>
      <a
        href="https://linkedin.com/in/nldavidmai"
        className="px text-light"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-linkedin" />
      </a>
      <a
        href="https://twitter.com/devmai90"
        className="px text-light"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter" />
      </a>
    </footer>
  );
};

export default Footer;
