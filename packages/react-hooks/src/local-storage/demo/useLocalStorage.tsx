/**
 * title: 将 state 持久化在 localStorage 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import type { FunctionComponent } from 'react';
import { Space, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useLocalStorage } from '..';

const Component: FunctionComponent = () => {
  const [value, setValue] = useLocalStorage('localStorageDemo', '');

  return (
    <>
      <Space direction="vertical">
        <Space>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Space>
        <Space>
          <Button type="primary" onClick={() => setValue('')}>
            重置
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;
