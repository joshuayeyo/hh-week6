import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * 디자인 토큰 Spacing 스토리
 * Spacing 스케일 확인용
 */

const meta: Meta = {
  title: 'Design Tokens/Spacing',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// Spacing Scale
export const SpacingScale: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: 'var(--background)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--foreground)' }}>Spacing Scale</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { name: '0', cssVar: '--spacing-0', value: '0' },
          { name: 'px', cssVar: '--spacing-px', value: '1px' },
          { name: '0.5', cssVar: '--spacing-0-5', value: '2px' },
          { name: '1', cssVar: '--spacing-1', value: '4px' },
          { name: '1.5', cssVar: '--spacing-1-5', value: '6px' },
          { name: '2', cssVar: '--spacing-2', value: '8px' },
          { name: '2.5', cssVar: '--spacing-2-5', value: '10px' },
          { name: '3', cssVar: '--spacing-3', value: '12px' },
          { name: '4', cssVar: '--spacing-4', value: '16px' },
          { name: '5', cssVar: '--spacing-5', value: '20px' },
          { name: '6', cssVar: '--spacing-6', value: '24px' },
          { name: '8', cssVar: '--spacing-8', value: '32px' },
          { name: '10', cssVar: '--spacing-10', value: '40px' },
          { name: '12', cssVar: '--spacing-12', value: '48px' },
          { name: '16', cssVar: '--spacing-16', value: '64px' },
        ].map((item) => (
          <div key={item.cssVar} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <code style={{ width: '140px', fontSize: '12px', color: 'var(--foreground-muted)' }}>
              {item.cssVar}
            </code>
            <span style={{ width: '50px', fontSize: '12px', color: 'var(--foreground-muted)' }}>
              {item.value}
            </span>
            <div style={{
              width: `var(${item.cssVar})`,
              height: '24px',
              backgroundColor: 'var(--primary)',
              borderRadius: '2px',
              minWidth: item.name === '0' ? '2px' : undefined,
              opacity: item.name === '0' ? 0.3 : 1,
            }} />
          </div>
        ))}
      </div>
    </div>
  ),
}

// Semantic Spacing - Component Examples
export const SemanticSpacing: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: 'var(--background)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--foreground)' }}>Semantic Spacing</h2>

      <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>Button Padding</h3>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center' }}>
        <div style={{
          padding: 'var(--btn-padding-sm)',
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          borderRadius: '4px',
          fontSize: 'var(--btn-font-size-sm)'
        }}>Small</div>
        <div style={{
          padding: 'var(--btn-padding-md)',
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          borderRadius: '4px',
          fontSize: 'var(--btn-font-size-md)'
        }}>Medium</div>
        <div style={{
          padding: 'var(--btn-padding-lg)',
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          borderRadius: '4px',
          fontSize: 'var(--btn-font-size-lg)'
        }}>Large</div>
      </div>

      <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>Card Padding</h3>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          border: '1px solid var(--border-light)',
          borderRadius: '4px',
          overflow: 'hidden',
          width: '200px'
        }}>
          <div style={{
            padding: 'var(--card-header-padding)',
            backgroundColor: 'var(--background-secondary)',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <strong>Header</strong>
            <code style={{ display: 'block', fontSize: '10px', color: 'var(--foreground-muted)' }}>
              --card-header-padding
            </code>
          </div>
          <div style={{ padding: 'var(--card-body-padding)' }}>
            <span>Body</span>
            <code style={{ display: 'block', fontSize: '10px', color: 'var(--foreground-muted)' }}>
              --card-body-padding
            </code>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>Layout Gap</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <code style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '8px', display: 'block' }}>
            --layout-gap-sm (8px)
          </code>
          <div style={{ display: 'flex', gap: 'var(--layout-gap-sm)' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '4px'
              }} />
            ))}
          </div>
        </div>
        <div>
          <code style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '8px', display: 'block' }}>
            --layout-gap-md (16px)
          </code>
          <div style={{ display: 'flex', gap: 'var(--layout-gap-md)' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '4px'
              }} />
            ))}
          </div>
        </div>
        <div>
          <code style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '8px', display: 'block' }}>
            --layout-gap-lg (24px)
          </code>
          <div style={{ display: 'flex', gap: 'var(--layout-gap-lg)' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '4px'
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
}
