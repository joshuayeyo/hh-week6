import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeToggle } from '@/components/primitives'
import { ThemeProvider } from '@/hooks'

/**
 * ThemeToggle 컴포넌트 스토리
 * 라이트/다크 모드 전환 버튼
 */

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 테마 토글
export const Default: Story = {
  args: {},
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ThemeToggle variant="ghost" />
      <ThemeToggle variant="outline" />
      <ThemeToggle variant="secondary" />
      <ThemeToggle variant="default" />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <ThemeToggle size="sm" />
      <ThemeToggle size="icon" />
      <ThemeToggle size="default" />
      <ThemeToggle size="lg" />
    </div>
  ),
}

// 다크모드 프리뷰
export const DarkModePreview: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <div className="p-6 bg-background rounded-lg border border-border">
          <p className="text-foreground mb-4">다크 모드 상태</p>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

// 헤더 사용 예시
export const InHeader: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg">
      <span className="text-sm text-foreground">설정</span>
      <ThemeToggle />
      <span className="text-sm text-muted-foreground">|</span>
      <span className="text-sm text-foreground">로그아웃</span>
    </div>
  ),
}
