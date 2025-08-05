import { InfiniteSlider } from "./js/InfiniteSlider";

const onLoad = () => {
  const container = document.querySelector('#slider');
  const items = document.querySelectorAll('.item')

  new InfiniteSlider(container, items);
};

window.addEventListener("DOMContentLoaded", onLoad);
