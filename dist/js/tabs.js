const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const techImg = [...document.getElementsByClassName('technology__img')];

const keydownLeft = 37;
const keydownRight = 39;
let tabFocus = 0;




window.addEventListener('resize', () => {
  const index = techImg.findIndex((image) => image.style.visibility === 'visible');
  const img = techImg[index].firstElementChild;
  console.log(img);
  const portraitUrl = img.src.replace('landscape', 'portrait');
  const landscapeUrl = img.src.replace('portrait', 'landscape');
  if(window.innerWidth >= 900) {
    img.src = portraitUrl;
  } else {
    img.src = landscapeUrl;
  }
});


function changeTabFocus(e) {
  if(e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute('tabindex', -1);
    if(e.keyCode === keydownRight) {
      tabFocus++;
      if(tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else {
      tabFocus--;
      if(tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
  }
  tabs[tabFocus].setAttribute('tabindex', 0);
  tabs[tabFocus].focus();
}

function changeTabPanel(e) {
  const tabTarget = e.currentTarget;
  const tabPanel = tabTarget.getAttribute('aria-controls');
  const targetPicture = tabTarget.getAttribute('data-image');

  const tabContainer = tabTarget.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer.querySelector('[aria-selected="true"]')
  .setAttribute('aria-selected', false);

  tabTarget.setAttribute('aria-selected', true);

  mainContainer.querySelectorAll('[role="tabpanel"]')
  .forEach(panel => panel.setAttribute('hidden', true));

  mainContainer.querySelector(`#${tabPanel}`)
  .removeAttribute('hidden');

  mainContainer.querySelectorAll('picture')
  .forEach(pic => pic.style.visibility = 'hidden');

  mainContainer.querySelector(`#${targetPicture}`)
  .style.visibility = 'visible';

}

tabList.addEventListener('keydown', changeTabFocus);
tabs.forEach(tab => tab.addEventListener('click', changeTabPanel));
