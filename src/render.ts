import type { IDraw } from "./draw.js";
import { circle, clear, line, lineGraph, rect } from './draw.js';

export type RenderStep = (draw: IDraw) => void;
export type RenderScene = () => void;

/**
 * Registers a callback for drawing a scene
 * 
 * @param callback 
 */
export const createScene = (ctx: CanvasRenderingContext2D) => {
    const render = createRenderer(ctx);
    let step: RenderStep | null = null;

    const renderScene: RenderScene = () => {
        if(!step) {
            return;
        }

        render(step);
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
const createRenderer = (ctx: CanvasRenderingContext2D) => {
    let isRunning = false;

    const draw = { 
        circle: circle(ctx), 
        clear: clear(ctx), 
        line: line(ctx),
        lineGraph: lineGraph(ctx),
        rect: rect(ctx)
    }

    return (step: RenderStep) => {
        if(!isRunning) {
            isRunning = true;

            requestAnimationFrame(() => {
                isRunning = false;

                draw.clear();
                step({
                    ...draw,
                    width: parseFloat(ctx.canvas.style.width),
                    height: parseFloat(ctx.canvas.style.height),
                });
            })
        }
    }
}