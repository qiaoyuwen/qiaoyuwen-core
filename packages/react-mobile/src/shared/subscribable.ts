/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { isFn } from './types';

const UNSUBSCRIBE_ID_SYMBOL = Symbol('UNSUBSCRIBE_ID_SYMBOL');

export interface ISubscriber<Payload = any> {
  (payload: Payload): void | boolean;
}

export class Subscribable<ExtendsType = any> {
  private subscribers: {
    index: number;
    [key: number]: ISubscriber;
  } = {
    index: 0,
  };

  dispatch<T extends ExtendsType = any>(event: T, context?: any) {
    let interrupted = false;
    for (const key in this.subscribers) {
      if (isFn(this.subscribers[key])) {
        event['context'] = context;
        if (this.subscribers[key](event) === false) {
          interrupted = true;
        }
      }
    }
    return !interrupted;
  }

  subscribe(subscriber: ISubscriber) {
    let id: number | undefined;
    if (isFn(subscriber)) {
      id = this.subscribers.index + 1;
      this.subscribers[id] = subscriber;
      this.subscribers.index += 1;
    }

    const unsubscribe = () => {
      this.unsubscribe(id);
    };

    unsubscribe[UNSUBSCRIBE_ID_SYMBOL] = id;

    return unsubscribe;
  }

  unsubscribe(id?: number | string | (() => void)) {
    if (id === undefined || id === null) {
      for (const key in this.subscribers) {
        this.unsubscribe(key);
      }
      return;
    }

    if (!isFn(id)) {
      delete this.subscribers[id];
    } else {
      delete this.subscribers[id[UNSUBSCRIBE_ID_SYMBOL]];
    }
  }
}
