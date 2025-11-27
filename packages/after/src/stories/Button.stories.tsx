import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/primitives'

/**
 * Button 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 버튼
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Button variant="default">Normal</Button>
        <Button variant="default" disabled>Disabled</Button>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary">Normal</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
      <div className="flex gap-3">
        <Button variant="destructive">Normal</Button>
        <Button variant="destructive" disabled>Disabled</Button>
      </div>
    </div>
  ),
}

// Full Width
export const FullWidth: Story = {
  render: () => (
    <div className="w-[300px]">
      <Button className="w-full">Full Width Button</Button>
    </div>
  ),
}

// All Variants Overview
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-foreground-muted">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-foreground-muted">Sizes</h3>
        <div className="flex items-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-foreground-muted">Disabled</h3>
        <div className="flex flex-wrap gap-2">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
}
