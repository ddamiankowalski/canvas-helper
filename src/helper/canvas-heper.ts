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

    setTimeout(() => {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(50, 50, 100, 100);
    }, 2000);
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
    return new ResizeObserver((entries) => {
      const [entry] = entries;
      const sizes = entry.devicePixelContentBoxSize;

      if (sizes && sizes.length) {
        const { inlineSize, blockSize } = sizes[0];
        this._resize(inlineSize, blockSize);
        return;
      }

      const rect = entry.contentRect;
      this._resize(rect.width, rect.height);
    });
  }

  private _resize(width: number, height: number): void {
    const dpr = window.devicePixelRatio || 1;

    this._canvas.style.width = `${width}px`;
    this._canvas.style.height = `${height}px`;

    this._canvas.width = Math.round(width * dpr);
    this._canvas.height = Math.round(height * dpr);

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}
