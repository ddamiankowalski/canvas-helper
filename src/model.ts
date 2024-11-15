import type { RenderScene } from "./scene.js";

/**
 * Creates model for the canvas
 * 
 * @param target 
 * @returns 
 */
export const createModel = <T extends Record<string | symbol, any>>(target: T, render: RenderScene) => {
    const handler: ProxyHandler<T> = {
        set(target: T, prop: string, value: any): boolean {
            if(target[prop]) {
                Reflect.set(target, prop, value);
                render();
            } else {
                throw new Error('MODEL_ERROR: Could not set property');
            }

            return true;
        }
    }

    return new Proxy(target, handler);
}