import { createHelper } from './dist/index.js'

const wrapper = document.getElementById('wrapper');

if(!wrapper) {
    throw new Error('Could not find the wrapper');
}

const model = {
    xPos: 100,
    yPos: 100
}

const helper = createHelper(wrapper);

helper.setScene(draw => {
    draw.circle(model.xPos, 50, 10)
})