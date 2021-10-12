import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-loader-circle/lib/index';

export default {
  title: 'Symbols/Loader Circle',
  component: 'uui-loader-circle',
  args: {
    size: 'xl',
  },
  argTypes: {
    size: {
      type: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
    },
  },
};

const Template: Story = props =>
  html`
    <uui-loader-circle
      style="color: ${props.color}"
      size=${props.size}
      progress=${props.progress}
      ?show-progress=${props.showProgress}></uui-loader-circle>
  `;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

AAAOverview.args = { color: 'black' };
AAAOverview.argTypes = {
  color: { table: { category: 'inline styling' } },
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-loader-circle></uui-loader-circle>`,
    },
  },
};

export const Color = Template.bind({});
Color.args = { color: 'blue' };
Color.argTypes = {
  color: { table: { category: 'inline styling' } },
};
Color.parameters = {
  controls: { include: ['color', 'size'] },
  docs: {
    source: {
      code: `<uui-loader-circle style="color: blue"></uui-loader-circle>`,
    },
  },
};

export const Progress = Template.bind({});
Progress.args = { progress: 75, showProgress: true };
Progress.parameters = {
  docs: {
    source: {
      code: `<uui-loader-circle progress="75" show-progress></uui-loader-circle>`,
    },
  },
};
