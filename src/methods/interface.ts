export type NativeReducers<S> = Record<string, (state: S, ...args: any[]) => S>;

export type ImmerReducers<S> = Record<string, (state: S, ...args: any[]) => S | void>;

type Strip<T> = T extends (state: any, ...args: infer P) => any ? (...args: P) => void : never;

export type Methods<S, R extends NativeReducers<S> | ImmerReducers<S>> = {
  [K in keyof R]: Strip<R[K]>;
};
