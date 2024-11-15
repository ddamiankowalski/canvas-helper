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
    let renderStep: RenderStep | null = null; 

    const renderScene: RenderScene = () => {
        renderStep && renderStep({
            circle: circle(ctx),
            clear: clear(ctx)
        });
    }

    const setScene = (step: RenderStep) => {
        renderStep = step;
    }

    return {
        renderScene,
        setScene
    }
}