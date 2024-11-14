import { createHelper } from './dist/index.js'

const wrapper = document.getElementById('wrapper');

if(!wrapper) {
    throw new Error('Could not find the wrapper');
}

const model = {
    xPos: 0,
    yPos: 0
}

const helper = createHelper(wrapper);

const scene = helper.createScene(model);