import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/components/forms'
import { Label } from '@/components/forms'

/**
 * Textarea 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <div className="space-y-2">
        <Label>Default</Label>
        <Textarea placeholder="Default textarea" variant="default" />
      </div>
      <div className="space-y-2">
        <Label variant="error">Error</Label>
        <Textarea placeholder="Error textarea" variant="error" />
      </div>
    </div>
  ),
}

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <div className="space-y-2">
        <Label>Normal</Label>
        <Textarea placeholder="Write something..." />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Textarea placeholder="Disabled textarea" disabled />
      </div>
      <div className="space-y-2">
        <Label>With value</Label>
        <Textarea defaultValue="This textarea has a default value that spans multiple lines." />
      </div>
    </div>
  ),
}

// Custom rows
export const CustomRows: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <div className="space-y-2">
        <Label>2 rows</Label>
        <Textarea placeholder="Short textarea" rows={2} />
      </div>
      <div className="space-y-2">
        <Label>6 rows</Label>
        <Textarea placeholder="Taller textarea" rows={6} />
      </div>
    </div>
  ),
}
