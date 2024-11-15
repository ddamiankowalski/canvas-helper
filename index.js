import { createHelper } from './dist/index.js'

const wrapper = document.getElementById('wrapper');

if(!wrapper) {
    throw new Error('Could not find the wrapper');
}

const initialModel = {
    xPos: 100,
    yPos: 100
}

const { model, setScene } = createHelper(wrapper, initialModel);

setScene(draw => {
    draw.clear();
    draw.circle(model.xPos, model.yPos, 10);
})

model.sxPos = 5;