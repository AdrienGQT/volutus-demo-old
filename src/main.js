import { Volutus } from "./js/Volutus";

const onLoad = () => {
  const container = document.querySelector('#slider');
  const items = document.querySelectorAll('.item')

  const volutus = new Volutus(container, items);
};

window.addEventListener("DOMContentLoaded", onLoad);
