import GUI from "lil-gui";
import { InfiniteSlider } from "./js/InfiniteSlider";

const onLoad = () => {
  const gui = new GUI()
  new InfiniteSlider(gui)
}

window.addEventListener('DOMContentLoaded', onLoad)