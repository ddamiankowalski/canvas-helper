/**
 * Interface for the drawing helper object
 */
export interface IDraw {
    clear: () => void,
    circle: (x: number, y: number, radius: number) => void
}

/**
 * Clears the canvas
 * 
 * @param ctx 
 */
export const clear = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    return () => {
        ctx.clearRect(0, 0, width, height);
    }
}

/**
 * Draws a circle on canvas
 * 
 * @param ctx 
 */
export const circle = (ctx: CanvasRenderingContext2D) => {
    return (x: number, y: number, radius: number) => {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}