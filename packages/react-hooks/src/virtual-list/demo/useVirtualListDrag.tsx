/**
 * title: 使用react-beautiful-dnd实现可拖拽虚拟列表
 */

import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { Button, Space, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { useVirtualList } from '..';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const getItems = (length: number = 10000) => {
  return Array.from({ length }).map((_, index) => `${index + 1}`);
};

function getStyle({ provided, style, isDragging }) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...style,
    ...provided.draggableProps.style,
  };

  const marginBottom = 8;
  const withSpacing = {
    ...combined,
    height: isDragging ? combined.height : combined.height - marginBottom,
    marginBottom,
  };
  return withSpacing;
}

function Item({ provided, item, style, isDragging }) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({ provided, style, isDragging })}
      className={`item ${isDragging ? 'is-dragging' : ''}`}
    >
      Item: {item.data}
    </div>
  );
}

const Component: FunctionComponent = () => {
  const items = getItems();
  const [value, setValue] = useState<number>(1000);
  const { list, containerProps, scrollTo } = useVirtualList(items, {
    itemHeight: 50,
  });

  const onChange = useCallback((changeValue: number) => setValue(changeValue), []);

  const onDragEnd = (result) => {
    console.log('onDragEnd', result);
  };

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <InputNumber min={1} max={10000} defaultValue={value} onChange={onChange} />
          <Button onClick={() => scrollTo(value - 1)}>滚动</Button>
        </Space>
        <DragDropContext onDragEnd={onDragEnd}>
          <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
            <Droppable
              droppableId="droppable"
              mode="virtual"
              renderClone={(provided, snapshot, rubric) => {
                return (
                  <Item
                    provided={provided}
                    isDragging={snapshot.isDragging}
                    item={{ data: items[rubric.source.index], index: rubric.source.index }}
                    style={{
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #e8e8e8',
                    }}
                  />
                );
              }}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  style={{ width: '100%', height: '500000px', position: 'relative' }}
                >
                  {list.map((item) => (
                    <Draggable draggableId={item.data} index={item.index} key={item.data}>
                      {(dragProvided) => (
                        <Item
                          provided={dragProvided}
                          item={item}
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: item.index * 50,
                            height: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #e8e8e8',
                          }}
                          isDragging={false}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </Space>
    </>
  );
};

export default Component;
