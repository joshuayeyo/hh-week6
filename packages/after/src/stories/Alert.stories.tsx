import type { Meta, StoryObj } from '@storybook/react-vite'
import '../styles/components.css'

/**
 * Alert 컴포넌트 스토리
 * 디자인 토큰 적용 검증용
 */

const meta: Meta = {
  title: 'Components/Alert',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// 알림 Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div className="alert alert-info">
        <span className="alert-icon">ℹ️</span>
        <div className="alert-content">
          <div className="alert-title">Information</div>
          <div className="alert-body">정보성 알림 메시지입니다.</div>
        </div>
      </div>

      <div className="alert alert-success">
        <span className="alert-icon">✅</span>
        <div className="alert-content">
          <div className="alert-title">Success</div>
          <div className="alert-body">작업이 성공적으로 완료되었습니다.</div>
        </div>
      </div>

      <div className="alert alert-warning">
        <span className="alert-icon">⚠️</span>
        <div className="alert-content">
          <div className="alert-title">Warning</div>
          <div className="alert-body">주의가 필요한 경고 메시지입니다.</div>
        </div>
      </div>

      <div className="alert alert-error">
        <span className="alert-icon">❌</span>
        <div className="alert-content">
          <div className="alert-title">Error</div>
          <div className="alert-body">오류가 발생했습니다. 다시 시도해주세요.</div>
        </div>
      </div>

      <div className="alert alert-default">
        <span className="alert-icon">📋</span>
        <div className="alert-content">
          <div className="alert-title">Default</div>
          <div className="alert-body">기본 알림 메시지입니다.</div>
        </div>
      </div>
    </div>
  ),
}

// 알림 with Close Button
export const WithCloseButton: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div className="alert alert-info">
        <span className="alert-icon">ℹ️</span>
        <div className="alert-content">
          <div className="alert-title">Dismissible Alert</div>
          <div className="alert-body">닫기 버튼이 있는 알림입니다.</div>
        </div>
        <button className="alert-close">×</button>
      </div>
    </div>
  ),
}

// 알림 Simple (Title Only)
export const SimpleAlert: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
      <div className="alert alert-info">
        <span className="alert-icon">ℹ️</span>
        <div className="alert-content">
          <div className="alert-body">간단한 정보 메시지입니다.</div>
        </div>
      </div>
      <div className="alert alert-success">
        <span className="alert-icon">✅</span>
        <div className="alert-content">
          <div className="alert-body">저장되었습니다.</div>
        </div>
      </div>
    </div>
  ),
}
