import type { IDraw } from './draw.js';
import { circle, clear, line, rect } from './draw.js';

export type RenderFn = (draw: IDraw) => void;
export type RenderScene = () => void;

/**
 * Registers a callback for drawing a scene
 *
 * @param callback
 */
export const createScene = (ctx: CanvasRenderingContext2D) => {
  const renderer = createRenderer(ctx);
  let renderFn: RenderFn | null = null;

  const renderScene: RenderScene = () => {
    if (!renderFn) {
      return;
    }

    renderer(renderFn);
  };

  const setScene = (callback: RenderFn) => {
    renderFn = callback;
  };

  return () => {};

  return {
    renderScene,
    setScene,
  };
};

/**
 * Creates draw object used as first
 * argument in render function
 *
 * @param ctx
 * @returns
 */
const createDraw = (ctx: CanvasRenderingContext2D) => {
  return {
    circle: circle(ctx),
    clear: clear(ctx),
    line: line(ctx),
    rect: rect(ctx),
  };
};

/**
 * Creates a render function that runs inside
 * requestAnimationFrame
 *
 * @returns
 */
const createRenderer = (ctx: CanvasRenderingContext2D) => {
  let isRunning = false;

  /**
   * Draw object that contains all available
   * drawing operations
   */
  const draw = {
    circle: circle(ctx),
    clear: clear(ctx),
    line: line(ctx),
    rect: rect(ctx),
  };

  return (renderFn: RenderFn) => {
    if (!isRunning) {
      isRunning = true;

      requestAnimationFrame(() => {
        isRunning = false;

        renderFn({
          ...draw,
          width: parseFloat(ctx.canvas.style.width),
          height: parseFloat(ctx.canvas.style.height),
        });
      });
    }
  };
};
