/**
 * title: 将 state 持久化在 localStorage 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import type { FunctionComponent } from 'react';
import { useRef } from 'react';
import { Space, Input } from 'antd';
import 'antd/dist/antd.css';
import { useSize } from '..';

const Component: FunctionComponent = () => {
  const elRef = useRef(null);
  const size = useSize(elRef);

  return (
    <>
      <Space direction="vertical">
        <Space>
          <span>宽：{size.width}</span>
          <span>高：{size.height}</span>
        </Space>
        <Input.TextArea ref={elRef} />
      </Space>
    </>
  );
};

export default Component;
