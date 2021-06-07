import type { FunctionComponent } from 'react';
import { Space, Button, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { useCounter } from '..';

const Component: FunctionComponent = () => {
  const [count, { inc, dec, reset }] = useCounter(0, {
    min: 0,
    max: 10,
  });

  return (
    <>
      <Space direction="vertical">
        <InputNumber min={0} max={10} value={count} />
        <Space>
          <Button type="primary" onClick={() => inc()}>
            inc
          </Button>
          <Button type="primary" onClick={() => dec()}>
            dec
          </Button>
          <Button type="primary" onClick={() => reset(0)}>
            reset
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;
