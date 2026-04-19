export class CavnvasHelper {
  /**
   * Canvas element
   */
  private _canvas: HTMLCanvasElement;

  /**
   * Observer of the wrapper element
   */
  private _observer: ResizeObserver;

  constructor(private _wrapper: HTMLElement) {
    this._canvas = this._createCanvas();
    this._observer = this._observeSize();

    this._draw();
  }

  get observer(): ResizeObserver {
    return this._observer;
  }

  get wrapper(): HTMLElement {
    return this._wrapper;
  }

  get ctx(): CanvasRenderingContext2D {
    const ctx = this._canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not retrieve context');
    }

    return ctx;
  }

  private _createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    this._wrapper.appendChild(canvas);

    return canvas;
  }

  private _observeSize(): ResizeObserver {
    const observer = new ResizeObserver((entries) => {
      const [entry] = entries;
      const sizes = entry.devicePixelContentBoxSize;

      if (sizes && sizes.length) {
        const { inlineSize, blockSize } = sizes[0];

        this._resize(inlineSize, blockSize);
        this._draw();

        return;
      }

      const rect = entry.contentRect;

      this._resize(rect.width, rect.height);
      this._draw();
    });

    observer.observe(this._wrapper);
    return observer;
  }

  private _resize(width: number, height: number): void {
    const dpr = window.devicePixelRatio || 1;

    console.log('resize');
    this._canvas.style.width = '100%';
    this._canvas.style.height = '100%';

    this._canvas.width = Math.round(width * dpr);
    this._canvas.height = Math.round(height * dpr);

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private _draw(): void {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(50, 50, 100, 100);
  }
}
