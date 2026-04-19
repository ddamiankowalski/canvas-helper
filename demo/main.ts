import { CavnvasHelper } from './../src/helper/canvas-heper';

const ID = 'canvas-wrapper';
const wrapper = document.getElementById(ID);

if (wrapper) {
  const helper = new CavnvasHelper(wrapper);
  helper.draw();
}
