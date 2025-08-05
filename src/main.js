import { InfiniteSlider } from "./js/InfiniteSlider";

const onLoad = () => {
  const container = document.querySelector('#slider');

  new InfiniteSlider(container);
};

window.addEventListener("DOMContentLoaded", onLoad);
