import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectOption } from '@/components/forms'
import { Label } from '@/components/forms'

/**
 * Select 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    selectSize: {
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

// 기본
export const Default: Story = {
  render: () => (
    <div className="w-[200px]">
      <Select defaultValue="">
        <SelectOption value="" disabled>선택하세요</SelectOption>
        <SelectOption value="option1">Option 1</SelectOption>
        <SelectOption value="option2">Option 2</SelectOption>
        <SelectOption value="option3">Option 3</SelectOption>
      </Select>
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[250px]">
      <div className="space-y-2">
        <Label>Default</Label>
        <Select variant="default" defaultValue="">
          <SelectOption value="" disabled>선택하세요</SelectOption>
          <SelectOption value="option1">Option 1</SelectOption>
          <SelectOption value="option2">Option 2</SelectOption>
        </Select>
      </div>
      <div className="space-y-2">
        <Label variant="error">Error</Label>
        <Select variant="error" defaultValue="">
          <SelectOption value="" disabled>선택하세요</SelectOption>
          <SelectOption value="option1">Option 1</SelectOption>
          <SelectOption value="option2">Option 2</SelectOption>
        </Select>
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[250px]">
      <div className="space-y-2">
        <Label>Small</Label>
        <Select selectSize="sm" defaultValue="option1">
          <SelectOption value="option1">Small Select</SelectOption>
          <SelectOption value="option2">Option 2</SelectOption>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Default</Label>
        <Select selectSize="default" defaultValue="option1">
          <SelectOption value="option1">Default Select</SelectOption>
          <SelectOption value="option2">Option 2</SelectOption>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Large</Label>
        <Select selectSize="lg" defaultValue="option1">
          <SelectOption value="option1">Large Select</SelectOption>
          <SelectOption value="option2">Option 2</SelectOption>
        </Select>
      </div>
    </div>
  ),
}

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[250px]">
      <div className="space-y-2">
        <Label>Normal</Label>
        <Select defaultValue="">
          <SelectOption value="" disabled>선택하세요</SelectOption>
          <SelectOption value="option1">Option 1</SelectOption>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>With value</Label>
        <Select defaultValue="option1">
          <SelectOption value="option1">Selected Option</SelectOption>
          <SelectOption value="option2">Option 2</SelectOption>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Select disabled defaultValue="option1">
          <SelectOption value="option1">Disabled</SelectOption>
        </Select>
      </div>
    </div>
  ),
}

// 실제 사용 예시
export const RealWorldExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="space-y-2">
        <Label>국가</Label>
        <Select defaultValue="">
          <SelectOption value="" disabled>국가를 선택하세요</SelectOption>
          <SelectOption value="kr">대한민국</SelectOption>
          <SelectOption value="us">미국</SelectOption>
          <SelectOption value="jp">일본</SelectOption>
          <SelectOption value="cn">중국</SelectOption>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>역할</Label>
        <Select defaultValue="user">
          <SelectOption value="admin">관리자</SelectOption>
          <SelectOption value="editor">편집자</SelectOption>
          <SelectOption value="user">일반 사용자</SelectOption>
        </Select>
      </div>
    </div>
  ),
}
