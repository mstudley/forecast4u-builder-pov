import { Builder } from '@builder.io/react';
import { Tile, Button } from '@carbon/react';

Builder.registerComponent(Tile, {
  name: 'Carbon Tile',
  inputs: [
    {
      name: 'children',
      type: 'uiBlocks',
      defaultValue: [],
    },
  ],
});

Builder.registerComponent(Button, {
  name: 'Carbon Button',
  inputs: [
    {
      name: 'children',
      type: 'text',
      defaultValue: 'Click me',
    },
    {
      name: 'href',
      type: 'url',
    },
  ],
});