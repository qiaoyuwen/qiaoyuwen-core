import type { IEventProps } from '@/shared';
import { Event, uid } from '@/shared';
import type { IEngineProps } from '../types';

export class Engine extends Event {
  id: string;
  props: IEngineProps<Engine>;

  constructor(props: IEngineProps<Engine>) {
    super(props as IEventProps);
    this.props = {
      ...Engine.defaultProps,
      ...props,
    };
    this.id = uid();
  }

  static defaultProps: IEngineProps<Engine> = {
    effects: [],
    drivers: [],
    sourceIdAttrName: 'data-designer-source-id',
    nodeIdAttrName: 'data-designer-node-id',
    contentEditableAttrName: 'data-content-editable',
    contentEditableNodeIdAttrName: 'data-content-editable-node-id',
    clickStopPropagationAttrName: 'data-click-stop-propagation',
    nodeHelpersIdAttrName: 'data-designer-node-helpers-id',
    outlineNodeIdAttrName: 'data-designer-outline-node-id',
    // shortcuts: [],
    // defaultScreenType: ScreenType.PC,
  };
}
