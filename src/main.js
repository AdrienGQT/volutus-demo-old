// import { Volutus } from "./volutus/Volutus";
import {Volutus} from 'volutus';

const onLoad = () => {
  const container = document.querySelector('#slider');
  const items = document.querySelectorAll('.item');
  const buttonPrev = document.querySelector('#buttonPrev');
  const buttonNext = document.querySelector('#buttonNext');

  const volutus = new Volutus({
    // Direction
    direction: "row", // or "column"
    // HTML Elements
    container : container,
    items : items,
    previousButton : buttonPrev,
    nextButton : buttonNext,
    // Tweaks
    gap: 12,
    scrollStrength: 0.2,
    dragStrength: 1.5,
    snapStrength: 0.02,
    lerpFactor: 0.05,
    // Features
    supportScroll: true,
    supportDrag: true,
    supportButtons : true,
  });
};

window.addEventListener("DOMContentLoaded", onLoad);
