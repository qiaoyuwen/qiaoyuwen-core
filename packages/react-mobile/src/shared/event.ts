/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import type {
  CustomEventClass,
  EventContainer,
  EventDriver,
  ICustomEvent,
  IEventDriverClass,
} from './event-driver';
import { env, EVENTS_BATCH_SYMBOL, EVENTS_ONCE_SYMBOL, EVENTS_SYMBOL } from './event-driver';
import type { ISubscriber } from './subscribable';
import { Subscribable } from './subscribable';
import { isArr, isWindow } from './types';

const ATTACHED_SYMBOL = Symbol('ATTACHED_SYMBOL');

export interface IEventEffect<T> {
  (engine: T): void;
}

export interface IEventProps<T = Event> {
  drivers?: IEventDriverClass<T>[];
  effects?: IEventEffect<T>[];
}

/**
 * 事件引擎
 */
export class Event extends Subscribable<ICustomEvent> {
  private drivers: IEventDriverClass<any>[] = [];
  private containers: EventContainer[] = [];

  constructor(props?: IEventProps) {
    super();
    if (isArr(props?.effects)) {
      props!.effects.forEach((plugin) => {
        plugin(this);
      });
    }
    if (isArr(props?.drivers)) {
      this.drivers = props!.drivers;
    }
  }

  subscribeTo<T extends CustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>) {
    return this.subscribe((event) => {
      if (type && event instanceof type) {
        return subscriber(event);
      }
    });
  }

  subscribeWith<T extends ICustomEvent = ICustomEvent>(
    type: string | string[],
    subscriber: ISubscriber<T>,
  ) {
    return this.subscribe((event) => {
      if (isArr(type)) {
        if (type.includes(event?.type)) {
          return subscriber(event);
        }
      } else if (type && event?.type === type) {
        return subscriber(event);
      }
    });
  }

  attachEvents(container: EventContainer, contentWindow: Window = window, context?: any) {
    if (!container) return;
    if (isWindow(container)) {
      return this.attachEvents(container.document, container, context);
    }
    if (container[ATTACHED_SYMBOL]) return;
    this.drivers.map((EventDriverClass) => {
      const driver = new EventDriverClass(this, context);
      driver.contentWindow = contentWindow;
      driver.container = container;
      driver.attach(container);
      return driver;
    });
    container[ATTACHED_SYMBOL] = true;
    if (!this.containers.includes(container)) {
      this.containers.push(container);
    }
  }

  detachEvents(container?: EventContainer) {
    if (!container) {
      this.containers.forEach((item) => {
        this.detachEvents(item);
      });
      return;
    }
    if (container instanceof Window) {
      return this.detachEvents(container.document);
    }
    if (!container[ATTACHED_SYMBOL]) return;
    env.ALL_EVENT_DRIVERS = env.ALL_EVENT_DRIVERS.reduce((drivers: EventDriver[], driver) => {
      if (driver.container === container) {
        driver.detach(container);
        return drivers;
      }
      return drivers.concat(driver);
    }, []);
    this.containers = this.containers.filter((item) => item !== container);
    delete container[ATTACHED_SYMBOL];
    delete container[EVENTS_SYMBOL];
    delete container[EVENTS_ONCE_SYMBOL];
    delete container[EVENTS_BATCH_SYMBOL];
  }

  destroy() {
    this.detachEvents();
    this.unsubscribe();
  }
}
