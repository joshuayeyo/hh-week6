import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * 디자인 토큰 컬러 팔레트 스토리
 * Primitives와 Semantics 컬러 확인용
 */

// 컬러 스와치 컴포넌트
const ColorSwatch = ({
  name,
  cssVar,
  textColor = 'black',
}: {
  name: string
  cssVar: string
  textColor?: string
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <div
      style={{
        width: '48px',
        height: '48px',
        backgroundColor: `var(${cssVar})`,
        borderRadius: '6px',
        border: '1px solid var(--border)',
      }}
    />
    <div>
      <div style={{ fontWeight: 600, color: textColor }}>{name}</div>
      <code style={{ fontSize: '12px', color: 'var(--foreground-muted)' }}>{cssVar}</code>
    </div>
  </div>
)

// 컬러 그룹 컴포넌트
const ColorGroup = ({
  title,
  colors,
}: {
  title: string
  colors: { name: string; cssVar: string }[]
}) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>{title}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
      {colors.map((color) => (
        <ColorSwatch key={color.cssVar} {...color} />
      ))}
    </div>
  </div>
)

// 메인 컬러 팔레트 컴포넌트
const ColorPalette = () => (
  <div style={{ padding: '24px', backgroundColor: 'var(--background)' }}>
    <h1 style={{ marginBottom: '32px', color: 'var(--foreground)' }}>Design Tokens - Color Palette</h1>

    <ColorGroup
      title="Primary (Blue)"
      colors={[
        { name: 'Primary', cssVar: '--primary' },
        { name: 'Primary Hover', cssVar: '--primary-hover' },
        { name: 'Primary Foreground', cssVar: '--primary-foreground' },
        { name: 'Primary Light', cssVar: '--primary-light' },
        { name: 'Primary Light Border', cssVar: '--primary-light-border' },
      ]}
    />

    <ColorGroup
      title="Destructive (Red)"
      colors={[
        { name: 'Destructive', cssVar: '--destructive' },
        { name: 'Destructive Hover', cssVar: '--destructive-hover' },
        { name: 'Destructive Foreground', cssVar: '--destructive-foreground' },
        { name: 'Destructive Light', cssVar: '--destructive-light' },
        { name: 'Destructive Light Border', cssVar: '--destructive-light-border' },
        { name: 'Destructive Text', cssVar: '--destructive-text' },
      ]}
    />

    <ColorGroup
      title="Success (Green)"
      colors={[
        { name: 'Success', cssVar: '--success' },
        { name: 'Success Hover', cssVar: '--success-hover' },
        { name: 'Success Foreground', cssVar: '--success-foreground' },
        { name: 'Success Light', cssVar: '--success-light' },
        { name: 'Success Light Border', cssVar: '--success-light-border' },
        { name: 'Success Text', cssVar: '--success-text' },
      ]}
    />

    <ColorGroup
      title="Warning (Orange)"
      colors={[
        { name: 'Warning', cssVar: '--warning' },
        { name: 'Warning Hover', cssVar: '--warning-hover' },
        { name: 'Warning Foreground', cssVar: '--warning-foreground' },
        { name: 'Warning Light', cssVar: '--warning-light' },
        { name: 'Warning Text', cssVar: '--warning-text' },
      ]}
    />

    <ColorGroup
      title="Info (Cyan)"
      colors={[
        { name: 'Info', cssVar: '--info' },
        { name: 'Info Hover', cssVar: '--info-hover' },
        { name: 'Info Foreground', cssVar: '--info-foreground' },
        { name: 'Info Light', cssVar: '--info-light' },
        { name: 'Info Light Border', cssVar: '--info-light-border' },
        { name: 'Info Text', cssVar: '--info-text' },
      ]}
    />

    <ColorGroup
      title="Neutral (Gray)"
      colors={[
        { name: 'Neutral', cssVar: '--neutral' },
        { name: 'Neutral Foreground', cssVar: '--neutral-foreground' },
        { name: 'Neutral Light', cssVar: '--neutral-light' },
        { name: 'Neutral Text', cssVar: '--neutral-text' },
      ]}
    />

    <ColorGroup
      title="Background"
      colors={[
        { name: 'Background', cssVar: '--background' },
        { name: 'Background Secondary', cssVar: '--background-secondary' },
        { name: 'Background Tertiary', cssVar: '--background-tertiary' },
      ]}
    />

    <ColorGroup
      title="Foreground"
      colors={[
        { name: 'Foreground', cssVar: '--foreground' },
        { name: 'Foreground Secondary', cssVar: '--foreground-secondary' },
        { name: 'Foreground Tertiary', cssVar: '--foreground-tertiary' },
        { name: 'Foreground Muted', cssVar: '--foreground-muted' },
      ]}
    />

    <ColorGroup
      title="Border & Input"
      colors={[
        { name: 'Border', cssVar: '--border' },
        { name: 'Border Light', cssVar: '--border-light' },
        { name: 'Border Dark', cssVar: '--border-dark' },
        { name: 'Input', cssVar: '--input' },
        { name: 'Input Focus', cssVar: '--input-focus' },
        { name: 'Input Error', cssVar: '--input-error' },
      ]}
    />
  </div>
)

const meta: Meta = {
  title: 'Design Tokens/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const LightMode: Story = {
  render: () => <ColorPalette />,
}

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <ColorPalette />
    </div>
  ),
}
