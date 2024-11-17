import { createHelper } from './dist/index.js'

const wrapper = document.getElementById('wrapper');

if(!wrapper) {
    throw new Error('Could not find the wrapper');
}

const { model, event, setScene } = createHelper(wrapper, {
    xPos: 250,
    yPos: 250,
});

setScene((draw) => {
    draw.lineGraph([15, 5, 2, 70, 20, 10, 20, 30, 10], { marginTop: 100, marginBottom: 100 });
    draw.circle(model.xPos, model.yPos, 10);
})

event.on('click', () => model.visible = !model.visible);

event.on('mousemove', ev => {
    model.xPos = ev.offsetX;
    model.yPos = ev.offsetY;
})

event.on('key', ev => {
    const pressed = ev.pressed;

    if(pressed.has('ArrowLeft')) {
        model.xPos -= 1;
    }

    if(pressed.has('ArrowRight')) {
        model.xPos += 1;
    }

    if(pressed.has('ArrowDown')) {
        model.yPos += 1;
    }

    if(pressed.has('ArrowUp')) {
        model.yPos -= 1;
    }
})