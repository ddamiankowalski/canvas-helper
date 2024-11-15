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

setScene((draw) => {
    draw.clear();
    draw.circle(initialModel.xPos, initialModel.yPos, 10);
})

model.xPos = 50;

setInterval(() => {
    model.xPos = Math.random() - 0.5 + model.xPos;
    model.yPos = Math.random() - 0.5 + model.yPos;
}, 1)