import { BurgerConstructorUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';
import { TIngredient } from '@utils-types';

const meta = {
  title: 'Example/BurgerConstructor',
  component: BurgerConstructorUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof BurgerConstructorUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultConstructor: Story = {
  args: {
    constructorItems: {
      bun: { _id: '', price: 0, image: '', name: '' } as TIngredient, //TODO:
      ingredients: []
    },
    orderRequest: false,
    price: 0,
    orderModalData: null,
    onOrderClick: () => {},
    closeOrderModal: () => {}
  }
};
