/**
 * Interface for the drawing helper object
 */
export interface IDraw {
    clear: () => void,
    circle: (x: number, y: number, radius: number) => void,
    line: (points: Point[]) => void;
    width: number;
    height: number;
}

/**
 * Type for point drawing
 */
type Point = {
    x: number;
    y: number;
}

/**
 * Clears the canvas
 * 
 * @param ctx 
 */
export const clear = (ctx: CanvasRenderingContext2D) => {
    return () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

/**
 * Draws a circle on canvas
 * 
 * @param ctx 
 */
export const circle = (ctx: CanvasRenderingContext2D) => {
    return (x: number, y: number, radius: number) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

/**
 * Draws a rectange on canvas
 * 
 * @param ctx 
 * @returns 
 */
export const rect = (ctx: CanvasRenderingContext2D) => {
    return (x: number, y: number, width: number, height: number) => {
        ctx.fillRect(x, y, width, height);
    }
}

/**
 * Draws line on canvas
 * 
 * @param ctx 
 * @returns 
 */
export const line = (ctx: CanvasRenderingContext2D) => {
    return (points: Point[]) => {
        if(points.length === 0) {
            return;
        }

        ctx.beginPath();
        
        for(let i = 0; i < points.length; i++) {
            const point = points[i];

            if(point) {
                i === 0 ? 
                    ctx.moveTo(point.x, point.y) : 
                    ctx.lineTo(point.x, point.y)
            }
        }

        ctx.stroke();
    }
}