const canvasMock = require('jest-canvas-mock');
global.ResizeObserver = require("resize-observer-polyfill");

beforeEach(() => {
    jest.resetAllMocks();
    canvasMock.setupJestCanvasMock();
});