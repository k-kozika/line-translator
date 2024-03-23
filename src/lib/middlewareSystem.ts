export type Middleware<T> = (
  context: T,
  next: Next
) => Promise<unknown> | unknown;

export type Next = () => Promise<void>;

export type Pipe<T> = {
  use: (...middlewares: Middleware<T>[]) => void;
  execute: (context: T) => Promise<void>;
};

export class Pipeline<T> implements Pipe<T> {
  private stack: Middleware<T>[];

  constructor(...middlewares: Middleware<T>[]) {
    this.stack = middlewares;
  }

  use(...middlewares: Middleware<T>[]): void {
    this.stack.push(...middlewares);
  }

  async execute(context: T): Promise<void> {
    const _handle = async (
      ctx: T,
      middleware: Middleware<T>[],
      index: number = 0
    ): Promise<void> => {
      if (index >= middleware.length) return;

      const currentMiddleware = middleware[index];
      await currentMiddleware(ctx, () => _handle(ctx, middleware, index + 1));
    };

    return _handle(context, this.stack);
  }
}
