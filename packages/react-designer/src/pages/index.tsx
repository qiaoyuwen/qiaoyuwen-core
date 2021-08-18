import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  DragSourceWidget,
  MainPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
} from '@designable/react';
import { SettingsForm } from '@designable/react-settings-form';
import { createDesigner, GlobalRegistry } from '@designable/core';
import {
  createDesignableField,
  createDesignableForm,
} from '@formily/designable-antd';
import '@formily/designable-antd';
import 'antd/dist/antd.less';

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
    },
  },
});

const Root = createDesignableForm({
  registryName: 'Root',
});

const DesignableField = createDesignableField({
  registryName: 'DesignableField',
});

const engine = createDesigner();

const App = () => {
  return (
    <Designer engine={engine}>
      <MainPanel logo="Designer">
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <DragSourceWidget title="sources.Inputs" name="inputs" />
            <DragSourceWidget title="sources.Layouts" name="layouts" />
            <DragSourceWidget title="sources.Arrays" name="arrays" />
          </CompositePanel.Item>
        </CompositePanel>

        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={['DESIGNABLE']} />
            </ToolbarPanel>

            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Root,
                      DesignableField,
                    }}
                  />
                )}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>

        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm />
        </SettingsPanel>
      </MainPanel>
    </Designer>
  );
};

export default App;
