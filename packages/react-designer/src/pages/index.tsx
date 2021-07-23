import type { FunctionComponent } from 'react';
import { useMemo } from 'react';
import { createDesigner } from '@designable/core';
import { Designer, MainPanel } from '@designable/react';

const App: FunctionComponent = () => {
  const engine = useMemo(() => createDesigner(), []);

  return (
    <Designer engine={engine}>
      <MainPanel logo="Designer"></MainPanel>
    </Designer>
  );
};

export default App;
