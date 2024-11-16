import { circle, clear, line } from './../src/draw';

describe('draw', () => {
    let ctx: CanvasRenderingContext2D;

    beforeEach(() => {
        const canvas = document.createElement('canvas');

        const c = canvas.getContext('2d');
        if(!c) {
            throw new Error('Could not get context');
        }

        ctx = c;
    })

    it('clear clears the canvas', () => {
        const fn = clear(ctx);
        fn();

        expect(ctx.clearRect).toHaveBeenCalledTimes(1);
        expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, ctx.canvas.width, ctx.canvas.height)
    })

    it('circle draws the circle on the canvas', () => {
        const x = 10;
        const y = 20;
        const arc = 30;

        const fn = circle(ctx);
        fn(x, y, arc);

        expect(ctx.beginPath).toHaveBeenCalledTimes(1);
        expect(ctx.arc).toHaveBeenCalledTimes(1);
        expect(ctx.arc).toHaveBeenCalledWith(x, y, arc, 0, 2 * Math.PI);
    })

    it('line draws the line on the canvas', () => {
        const points = [{ x: 0, y: 10 }, { x: 10, y: 20 }, { x: 10, y: 30 }]

        const fn = line(ctx);
        fn(points);

        expect(ctx.stroke).toHaveBeenCalledTimes(1);
        expect(ctx.beginPath).toHaveBeenCalledTimes(1);
        expect(ctx.moveTo).toHaveBeenCalledTimes(1);
        expect(ctx.moveTo).toHaveBeenCalledWith(0, 10);
        expect(ctx.lineTo).toHaveBeenCalledTimes(2);
        expect(ctx.lineTo).toHaveBeenNthCalledWith(1, 10, 20);
        expect(ctx.lineTo).toHaveBeenNthCalledWith(2, 10, 30);
    })

    it('does not draw line if points length is 0', () => {
        const fn = line(ctx);
        fn([]);

        expect(ctx.beginPath).not.toHaveBeenCalledTimes(1);
        expect(ctx.lineTo).not.toHaveBeenCalledTimes(1);
        expect(ctx.moveTo).not.toHaveBeenCalledTimes(1);
        expect(ctx.stroke).not.toHaveBeenCalledTimes(1);
    })
})