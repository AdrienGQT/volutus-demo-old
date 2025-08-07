import { Volutus } from "./js/Volutus";

const onLoad = () => {
  const container = document.querySelector('#slider');
  const items = document.querySelectorAll('.item');
  const buttonPrev = document.querySelector('#buttonPrev');
  const buttonNext = document.querySelector('#buttonNext');

  const volutus = new Volutus({
    container : container,
    items : items,
    previousButton : buttonPrev,
    nextButton : buttonNext,
    gap: 12,
    supportScroll: false,
    supportDrag: false,
    supportButtons : true,
    displayDebug : true
  });
};

window.addEventListener("DOMContentLoaded", onLoad);
