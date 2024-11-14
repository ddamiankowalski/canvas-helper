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
    setInterval(() => {
        draw.clear();
        draw.circle(model.xPos, model.yPos, 10);
    }, 100)
})

setInterval(() => {
    model.xPos = model.xPos + 1;
    model.yPos = model.yPos + 1;
}, 100)