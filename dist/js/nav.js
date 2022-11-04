const nav = document.querySelector('.primary-navigation');
const menuBtn = document.querySelector('.menu--hamburger');

function toggleMenu({target}) {
  const expanded = target.getAttribute('aria-expanded') === 'true' || false;
  const visiblity = nav.getAttribute('data-visible') === 'true' || false;

  target.setAttribute('aria-expanded', !expanded);
  nav.setAttribute('data-visible', !visiblity);

}
menuBtn.addEventListener('click', toggleMenu);

const links = [...nav.getElementsByTagName('li')];

links.forEach((link) => {
  link.classList.remove('active');
  /* take the name of page in the href by slicing from the position of last character '/' to the last character '.' */
  const slash = link.firstElementChild.href.lastIndexOf('/');
  const dot = link.firstElementChild.href.lastIndexOf('.');
  const page = link.firstElementChild.href.slice(slash + 1, dot);
  if(window.location.href.indexOf(page) != -1) {
    link.classList.add('active');
  }
});