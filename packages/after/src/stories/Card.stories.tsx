import type { Meta, StoryObj } from '@storybook/react-vite'
import '../styles/components.css'

/**
 * Card 컴포넌트 스토리
 * 디자인 토큰 적용 검증용
 */

const meta: Meta = {
  title: 'Components/Card',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// 카드 Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '800px' }}>
      <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title">Default Card</h3>
        </div>
        <div className="card-body">
          <p>기본 카드 스타일입니다. box-shadow와 border가 적용됩니다.</p>
        </div>
      </div>

      <div className="card card-bordered">
        <div className="card-header">
          <h3 className="card-title">Bordered Card</h3>
        </div>
        <div className="card-body">
          <p>테두리만 있는 플랫한 카드 스타일입니다.</p>
        </div>
      </div>

      <div className="card card-elevated">
        <div className="card-header">
          <h3 className="card-title">Elevated Card</h3>
        </div>
        <div className="card-body">
          <p>높은 고도의 그림자가 적용된 카드입니다.</p>
        </div>
      </div>

      <div className="card card-flat">
        <div className="card-header">
          <h3 className="card-title">Flat Card</h3>
        </div>
        <div className="card-body">
          <p>배경색만 다른 완전히 플랫한 카드입니다.</p>
        </div>
      </div>
    </div>
  ),
}

// 카드 with Subtitle
export const WithSubtitle: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <div className="card card-default">
        <div className="card-header">
          <div>
            <h3 className="card-title">Card Title</h3>
            <p className="card-subtitle">Card subtitle goes here</p>
          </div>
        </div>
        <div className="card-body">
          <p>카드 본문 내용입니다. 디자인 토큰이 적용된 타이포그래피를 확인할 수 있습니다.</p>
        </div>
      </div>
    </div>
  ),
}

// 카드 with Action
export const WithAction: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title">Card with Action</h3>
          <button className="btn btn-primary btn-sm">Action</button>
        </div>
        <div className="card-body">
          <p>헤더에 액션 버튼이 있는 카드입니다.</p>
        </div>
      </div>
    </div>
  ),
}
