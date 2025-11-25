import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * 디자인 토큰 Typography 스토리
 * Font Size, Font Weight, Line Height 확인용
 */

const meta: Meta = {
  title: 'Design Tokens/Typography',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// Font Sizes
export const FontSizes: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: 'var(--background)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--foreground)' }}>Font Sizes</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { name: 'xs', cssVar: '--font-size-xs', size: '10px' },
          { name: 'sm', cssVar: '--font-size-sm', size: '12px' },
          { name: 'base', cssVar: '--font-size-base', size: '14px' },
          { name: 'md', cssVar: '--font-size-md', size: '15px' },
          { name: 'lg', cssVar: '--font-size-lg', size: '16px' },
          { name: 'xl', cssVar: '--font-size-xl', size: '18px' },
          { name: '2xl', cssVar: '--font-size-2xl', size: '20px' },
          { name: '3xl', cssVar: '--font-size-3xl', size: '24px' },
          { name: '4xl', cssVar: '--font-size-4xl', size: '28px' },
        ].map((item) => (
          <div key={item.cssVar} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <code style={{ width: '180px', fontSize: '12px', color: 'var(--foreground-muted)' }}>
              {item.cssVar}
            </code>
            <span style={{ width: '60px', fontSize: '12px', color: 'var(--foreground-muted)' }}>
              {item.size}
            </span>
            <span style={{ fontSize: `var(${item.cssVar})`, color: 'var(--foreground)' }}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
}

// Font Weights
export const FontWeights: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: 'var(--background)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--foreground)' }}>Font Weights</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { name: 'normal', cssVar: '--font-weight-normal', weight: '400' },
          { name: 'medium', cssVar: '--font-weight-medium', weight: '500' },
          { name: 'semibold', cssVar: '--font-weight-semibold', weight: '600' },
          { name: 'bold', cssVar: '--font-weight-bold', weight: '700' },
        ].map((item) => (
          <div key={item.cssVar} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <code style={{ width: '200px', fontSize: '12px', color: 'var(--foreground-muted)' }}>
              {item.cssVar}
            </code>
            <span style={{ width: '40px', fontSize: '12px', color: 'var(--foreground-muted)' }}>
              {item.weight}
            </span>
            <span style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: `var(${item.cssVar})`,
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
}

// Line Heights
export const LineHeights: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: 'var(--background)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--foreground)' }}>Line Heights</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {[
          { name: 'none', cssVar: '--line-height-none', value: '1' },
          { name: 'tight', cssVar: '--line-height-tight', value: '1.25' },
          { name: 'snug', cssVar: '--line-height-snug', value: '1.375' },
          { name: 'normal', cssVar: '--line-height-normal', value: '1.5' },
          { name: 'relaxed', cssVar: '--line-height-relaxed', value: '1.625' },
          { name: 'loose', cssVar: '--line-height-loose', value: '2' },
        ].map((item) => (
          <div key={item.cssVar} style={{
            padding: '16px',
            border: '1px solid var(--border-light)',
            borderRadius: '4px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <code style={{ fontSize: '12px', color: 'var(--foreground-muted)' }}>
                {item.cssVar}
              </code>
              <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--foreground-muted)' }}>
                ({item.value})
              </span>
            </div>
            <p style={{
              fontSize: 'var(--font-size-base)',
              lineHeight: `var(${item.cssVar})`,
              color: 'var(--foreground)',
              margin: 0,
              backgroundColor: 'var(--background-secondary)',
              padding: '8px'
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
}
