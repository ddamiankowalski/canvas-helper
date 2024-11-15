import type { IDraw } from "./draw.js";
import { circle, clear } from './draw.js';

export type RenderStep = (draw: IDraw) => void;
export type RenderScene = () => void;

/**
 * Registers a callback for drawing a scene
 * 
 * @param callback 
 */
export const createScene = (ctx: CanvasRenderingContext2D) => {
    const render = createRenderer();
    let step: RenderStep | null = null;

    const renderScene: RenderScene = () => {
        if(!step) {
            return;
        }

        render(step, ctx);
    }

    const setScene = (callback: RenderStep) => {
        step = callback;
    }

    return {
        renderScene,
        setScene
    }
}

/**
 * Creates a render function that runs inside
 * requestAnimationFrame
 * 
 * @returns
 */
const createRenderer = () => {
    let isRunning = false;

    return (step: RenderStep, ctx: CanvasRenderingContext2D) => {
        if(!isRunning) {
            isRunning = true;

            requestAnimationFrame(() => {
                step({ circle: circle(ctx), clear: clear(ctx) });
                isRunning = false;
            })
        }
    }
}