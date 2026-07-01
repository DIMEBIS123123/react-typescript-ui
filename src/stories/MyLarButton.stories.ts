import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import MyLarButton from '../MyLarButton/MyLarButton'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Example/MyLarButton',
	component: MyLarButton,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof MyLarButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		color: 'red',
		children: 'Текст',
	},
}

export const Secondary: Story = {
	args: {
		color: 'blue',
		children: 'Текст',
	},
}
