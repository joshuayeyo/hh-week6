import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * 디자인 토큰 Shadow 스토리
 * Box Shadow 스케일 확인용
 */

const meta: Meta = {
  title: 'Design Tokens/Shadow',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// Shadow Scale (Primitives)
export const ShadowScale: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: 'var(--background-secondary)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--foreground)' }}>Shadow Scale</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '32px' }}>
        {[
          { name: 'none', cssVar: '--shadow-none' },
          { name: 'sm', cssVar: '--shadow-sm' },
          { name: 'md', cssVar: '--shadow-md' },
          { name: 'lg', cssVar: '--shadow-lg' },
          { name: 'xl', cssVar: '--shadow-xl' },
        ].map((item) => (
          <div key={item.cssVar} style={{ textAlign: 'center' }}>
            <div style={{
              width: '150px',
              height: '100px',
              backgroundColor: 'var(--background)',
              borderRadius: '8px',
              boxShadow: `var(${item.cssVar})`,
              margin: '0 auto 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'var(--foreground-muted)', fontSize: '14px' }}>{item.name}</span>
            </div>
            <code style={{ fontSize: '12px', color: 'var(--foreground-muted)' }}>
              {item.cssVar}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
}

// Semantic Shadows (Component-specific)
export const SemanticShadows: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: 'var(--background-secondary)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--foreground)' }}>Semantic Shadows</h2>

      <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>Card Shadows</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {[
          { name: 'Default', cssVar: '--card-shadow-default' },
          { name: 'Flat', cssVar: '--card-shadow-flat' },
          { name: 'Elevated', cssVar: '--card-shadow-elevated' },
        ].map((item) => (
          <div key={item.cssVar} style={{
            backgroundColor: 'var(--background)',
            borderRadius: '4px',
            padding: '16px',
            boxShadow: `var(${item.cssVar})`,
            border: '1px solid var(--border-light)'
          }}>
            <strong style={{ color: 'var(--foreground)' }}>{item.name}</strong>
            <code style={{ display: 'block', fontSize: '11px', color: 'var(--foreground-muted)', marginTop: '8px' }}>
              {item.cssVar}
            </code>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>Modal Shadow</h3>
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          width: '300px',
          backgroundColor: 'var(--background)',
          borderRadius: '4px',
          boxShadow: 'var(--modal-shadow)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <strong style={{ color: 'var(--foreground)' }}>Modal Title</strong>
            <span style={{ color: 'var(--foreground-muted)' }}>×</span>
          </div>
          <div style={{ padding: '16px' }}>
            <p style={{ color: 'var(--foreground)', margin: 0 }}>Modal content goes here</p>
            <code style={{ display: 'block', fontSize: '11px', color: 'var(--foreground-muted)', marginTop: '12px' }}>
              --modal-shadow
            </code>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>Other Shadows</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '24px' }}>
        {[
          { name: 'Dropdown', cssVar: '--dropdown-shadow' },
          { name: 'Popover', cssVar: '--popover-shadow' },
          { name: 'Toast', cssVar: '--toast-shadow' },
          { name: 'Tooltip', cssVar: '--tooltip-shadow' },
        ].map((item) => (
          <div key={item.cssVar} style={{
            backgroundColor: 'var(--background)',
            borderRadius: '4px',
            padding: '12px',
            boxShadow: `var(${item.cssVar})`,
            textAlign: 'center'
          }}>
            <span style={{ color: 'var(--foreground)', fontSize: '14px' }}>{item.name}</span>
            <code style={{ display: 'block', fontSize: '10px', color: 'var(--foreground-muted)', marginTop: '4px' }}>
              {item.cssVar}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
}
