import { createHelper } from './dist/index.js'

const wrapper = document.getElementById('wrapper');

if(!wrapper) {
    throw new Error('Could not find the wrapper');
}

const initialModel = {
    xPos: 150,
    yPos: 250,
    radius: 10
}

const { model, setScene } = createHelper(wrapper, initialModel);

setScene((draw) => {
    draw.circle(model.xPos, model.yPos, model.radius);
})

wrapper.addEventListener('mousemove', (ev) => {
    const movement = Math.abs(Math.max(ev.movementX, ev.movementY)) * 2;
    model.xPos = ev.offsetX;
    model.yPos = ev.offsetY;
    model.radius = movement;
})