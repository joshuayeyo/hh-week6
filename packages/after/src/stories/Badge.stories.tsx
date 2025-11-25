import type { Meta, StoryObj } from '@storybook/react-vite'
import '../styles/components.css'

/**
 * Badge 컴포넌트 스토리
 * 디자인 토큰 적용 검증용
 */

const meta: Meta = {
  title: 'Components/Badge',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// 뱃지 Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <span className="badge badge-primary badge-medium">Primary</span>
      <span className="badge badge-secondary badge-medium">Secondary</span>
      <span className="badge badge-success badge-medium">Success</span>
      <span className="badge badge-danger badge-medium">Danger</span>
      <span className="badge badge-warning badge-medium">Warning</span>
      <span className="badge badge-info badge-medium">Info</span>
    </div>
  ),
}

// 뱃지 Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <span className="badge badge-primary badge-small">Small</span>
      <span className="badge badge-primary badge-medium">Medium</span>
      <span className="badge badge-primary badge-large">Large</span>
    </div>
  ),
}

// 뱃지 Pill Shape
export const PillShape: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <span className="badge badge-pill badge-primary badge-medium">Primary</span>
      <span className="badge badge-pill badge-secondary badge-medium">Secondary</span>
      <span className="badge badge-pill badge-success badge-medium">Success</span>
      <span className="badge badge-pill badge-danger badge-medium">Danger</span>
      <span className="badge badge-pill badge-warning badge-medium">Warning</span>
      <span className="badge badge-pill badge-info badge-medium">Info</span>
    </div>
  ),
}

// 뱃지 in Context
export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Status:</span>
        <span className="badge badge-success badge-small">Active</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Priority:</span>
        <span className="badge badge-danger badge-small">High</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Type:</span>
        <span className="badge badge-info badge-small">Feature</span>
      </div>
    </div>
  ),
}
