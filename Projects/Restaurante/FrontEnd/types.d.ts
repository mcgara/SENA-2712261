import NativeEventEmitter from 'events'

export class EventEmitter<U extends string> extends NativeEventEmitter {
  on(eventName: U, listener: (...args: any[]) => void): this;
  addListener(eventName: U, listener: (...args: any[]) => void): this;
  off(eventName: U, listener: (...args: any[]) => void): this;
  emit(eventName: U, ...args: any[]): boolean;
  listenerCount(eventName: U, listener?: Function | undefined): number;
  listeners(eventName: U): Function[];
  rawListeners(eventName: U): Function[];
  once(eventName: U, listener: (...args: any[]) => void): this;
  prependListener(eventName: U, listener: (...args: any[]) => void): this;
  prependOnceListener(eventName: U, listener: (...args: any[]) => void): this;
  removeListener(eventName: U, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: U | undefined): this;
}
