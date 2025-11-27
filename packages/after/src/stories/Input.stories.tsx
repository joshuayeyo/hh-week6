import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/forms'
import { Label } from '@/components/forms'

/**
 * Input 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 인풋
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="space-y-2">
        <Label>Default</Label>
        <Input placeholder="Default input" variant="default" />
      </div>
      <div className="space-y-2">
        <Label variant="error">Error</Label>
        <Input placeholder="Error input" variant="error" />
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="space-y-2">
        <Label>Small</Label>
        <Input placeholder="Small input" size="sm" />
      </div>
      <div className="space-y-2">
        <Label>Default</Label>
        <Input placeholder="Default input" size="default" />
      </div>
      <div className="space-y-2">
        <Label>Large</Label>
        <Input placeholder="Large input" size="lg" />
      </div>
    </div>
  ),
}

// Types
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input type="text" placeholder="Enter text" />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" placeholder="Enter password" />
      </div>
      <div className="space-y-2">
        <Label>Number</Label>
        <Input type="number" placeholder="0" />
      </div>
    </div>
  ),
}

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="space-y-2">
        <Label>Normal</Label>
        <Input placeholder="Normal input" />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Input placeholder="Disabled input" disabled />
      </div>
      <div className="space-y-2">
        <Label>With value</Label>
        <Input defaultValue="Input with value" />
      </div>
    </div>
  ),
}
