# @javascripthub/canvas-helper

> `Canvas` utility tool for creating and drawing on HTML5 canvas. Library allows you to skip tedious and repetitive work to make work with canvas easier

## Installation
Library should be installed as a normal dependency using npm (node package manager)
```
npm install @javascripthub/canvas-helper
```

## Description
This utility was created to make working with canvas easier and quicker. The automations the library includes are

1) Embedding canvas inside a wrapper
2) Ensuring correct CSS pixel to device pixel scaling
3) Rescaling the canvas along with the size of the wrapper
4) Exposing drawing utility methods for drawing shapes/lines and other shapes or objects
5) Exposing so-called "model"

## Usage
Import `createHelper` function that is exported from the package. The function takes in two arguments - `wrapper` - an element in which the canvas should be embedded, and `initialModel` - the object that represents the model, which can be used to keep the state of the shapes drawn on canvas.

```
const { model, setScene } =  createHelper(wrapper, {
  x: 0,
  y: 0
});

setScene((draw) => {
  draw.circle(model.xPos, model.yPos, model.radius);
})
```

### Scene
Scene is the context, in which the shapes and objects are rendered every time either the size of the canvas (when user changes the height/width of the window) or the model changes

### Model
Model is the state that can be used from within the scene to render things on canvas using the draw utility tools. Keep in mind that every time the model object properties values change, the scene will also be re-rendered. This is useful because after defining the scene, the only thing needed to re-render the scene  is to change any properties inside the model