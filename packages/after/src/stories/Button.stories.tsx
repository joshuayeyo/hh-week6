import type { Meta, StoryObj } from '@storybook/react-vite'
import '../styles/components.css'

/**
 * Button 컴포넌트 스토리
 * 디자인 토큰 적용 검증용
 */

const meta: Meta = {
  title: 'Components/Button',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// 버튼 Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button className="btn btn-primary btn-md">Primary</button>
      <button className="btn btn-secondary btn-md">Secondary</button>
      <button className="btn btn-danger btn-md">Danger</button>
      <button className="btn btn-success btn-md">Success</button>
    </div>
  ),
}

// 버튼 Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <button className="btn btn-primary btn-sm">Small</button>
      <button className="btn btn-primary btn-md">Medium</button>
      <button className="btn btn-primary btn-lg">Large</button>
    </div>
  ),
}

// 버튼 States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-primary btn-md">Normal</button>
        <button className="btn btn-primary btn-md" disabled>Disabled</button>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-secondary btn-md">Normal</button>
        <button className="btn btn-secondary btn-md" disabled>Disabled</button>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-danger btn-md">Normal</button>
        <button className="btn btn-danger btn-md" disabled>Disabled</button>
      </div>
    </div>
  ),
}

// Full Width
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <button className="btn btn-primary btn-md btn-fullwidth">Full Width Button</button>
    </div>
  ),
}
