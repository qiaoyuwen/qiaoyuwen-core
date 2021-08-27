import type { IEventProps } from '@/shared';

export type IEngineProps<T = Event> = IEventProps<T> & {
  sourceIdAttrName?: string; // 拖拽源Id的dom属性名
  nodeIdAttrName?: string; // 节点Id的dom属性名
  contentEditableAttrName?: string; // 原地编辑属性名
  contentEditableNodeIdAttrName?: string; // 原地编辑指定Node Id属性名
  clickStopPropagationAttrName?: string; // 点击阻止冒泡属性
  outlineNodeIdAttrName?: string; // 大纲树节点ID的dom属性名
  nodeHelpersIdAttrName?: string; // 节点工具栏属性名
  // defaultScreenType?: ScreenType; // 默认屏幕类型
  // shortcuts?: Shortcut[]; // 快捷键
};
