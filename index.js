import { createHelper } from './dist/index.js'

const wrapper = document.getElementById('wrapper');

if(!wrapper) {
    throw new Error('Could not find the wrapper');
}

const { model, event, setScene } = createHelper(wrapper, {
    xPos: 0,
    yPos: 0,
    visible: true
});

setScene((draw) => {
    if(!model.visible) return;

    draw.line([{ x: model.xPos, y: 0 }, { x: model.xPos, y: draw.height }])
    draw.line([{ x: 0, y: model.yPos }, { x: draw.width, y: model.yPos }])
})

event.on('click', () => model.visible = !model.visible);

event.on('mousemove', ev => {
    model.xPos = ev.offsetX;
    model.yPos = ev.offsetY;
})