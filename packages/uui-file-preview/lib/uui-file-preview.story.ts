import '.';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-icon/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-file-preview',
  title: 'Displays/File Preview',
  component: 'uui-file-preview',
};

export const Overview: Story = props =>
  html`
    <uui-icon-registry-essential>
      <uui-file-preview
        name=${props.name}
        extension=${props.extension}
        size=${props.size}
        ?isDirectory=${props.isDirectory}
        src=${props.src}
        url="${props.url}">
        <uui-action-bar slot="actions">
          <uui-button look="">
            <uui-icon name="copy"></uui-icon>
          </uui-button>
          <uui-button look="danger">
            <uui-icon name="delete"></uui-icon>
          </uui-button>
        </uui-action-bar>
      </uui-file-preview>
    </uui-icon-registry-essential>
  `;

Overview.args = {
  name: 'ThisFileHasAVeryAndIMeanVeryLongName',
  extension: 'pdf',
  size: '12376',
};
