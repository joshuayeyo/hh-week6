import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Checkbox } from '@/components/forms'
import { Label } from '@/components/forms'

/**
 * Checkbox 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
  render: function Render() {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="default"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Label htmlFor="default">Accept terms and conditions</Label>
      </div>
    )
  },
}

// Variants
export const Variants: Story = {
  render: function Render() {
    const [checked1, setChecked1] = useState(true)
    const [checked2, setChecked2] = useState(true)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="var-default"
            variant="default"
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
          />
          <Label htmlFor="var-default">Default variant</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="var-error"
            variant="error"
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
          />
          <Label htmlFor="var-error" variant="error">Error variant</Label>
        </div>
      </div>
    )
  },
}

// States
export const States: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="unchecked"
            checked={false}
            onChange={() => {}}
          />
          <Label htmlFor="unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="checked-state"
            checked={true}
            onChange={() => {}}
          />
          <Label htmlFor="checked-state">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="interactive"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Label htmlFor="interactive">Interactive (click me)</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled" className="opacity-50">Disabled</Label>
        </div>
      </div>
    )
  },
}

// Form example
export const FormExample: Story = {
  render: function Render() {
    const [options, setOptions] = useState({
      newsletter: false,
      updates: false,
      marketing: false,
    })

    const handleChange = (key: keyof typeof options) => {
      setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium mb-2">알림 설정</p>
        <div className="flex items-center gap-2">
          <Checkbox
            id="newsletter"
            checked={options.newsletter}
            onChange={() => handleChange('newsletter')}
          />
          <Label htmlFor="newsletter">뉴스레터 수신</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="updates"
            checked={options.updates}
            onChange={() => handleChange('updates')}
          />
          <Label htmlFor="updates">제품 업데이트 알림</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="marketing"
            checked={options.marketing}
            onChange={() => handleChange('marketing')}
          />
          <Label htmlFor="marketing">마케팅 정보 수신</Label>
        </div>
      </div>
    )
  },
}
