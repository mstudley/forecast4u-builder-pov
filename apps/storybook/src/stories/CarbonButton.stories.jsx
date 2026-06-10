import { Button } from '@carbon/react';
import '@carbon/react/index.scss';

export default {
  title: 'Carbon/Button',
  component: Button,
};

export const Primary = {
  args: {
    children: 'View Forecast',
  },
};

export const Secondary = {
  args: {
    kind: 'secondary',
    children: 'Learn More',
  },
};