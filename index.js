import { createHelper } from './dist/index.js'

const wrapper = document.getElementById('wrapper');

if(!wrapper) {
    throw new Error('Could not find the wrapper');
}

const { model, event, setScene } = createHelper(wrapper, {
    xPos: 100,
    yPos: 100,
});

setScene((draw) => {
    draw.rect(model.xPos, model.yPos, 50, 50)
    // draw.line([{ x: model.xPos, y: 0 }, { x: model.xPos, y: draw.height }])
    // draw.line([{ x: 0, y: model.yPos }, { x: draw.width, y: model.yPos }])
})

event.on('click', () => model.visible = !model.visible);

event.on('mousemove', ev => {
    // model.xPos = ev.offsetX;
    // model.yPos = ev.offsetY;
})

event.on('keydown', ev => {
    console.log(ev.keyCode);
    switch(ev.keyCode) {
        case 37:
            model.xPos -= 10;
            break;
        case 38:
            model.yPos -= 10;
            break;
        case 39:
            model.xPos += 10;
            break;
        case 40:
            model.yPos += 10;
            break;
    }
})