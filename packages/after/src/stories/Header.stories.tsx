import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Header,
  HeaderContent,
  HeaderLogo,
  HeaderNav,
  HeaderActions,
} from '@/components/layout'
import { Button } from '@/components/primitives'

/**
 * Header 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'flat'],
    },
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 헤더
export const Default: Story = {
  render: () => (
    <Header position="static">
      <HeaderContent>
        <HeaderLogo>
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            L
          </div>
          <span className="font-semibold">Logo</span>
        </HeaderLogo>
        <HeaderActions>
          <Button variant="ghost" size="sm">로그인</Button>
          <Button size="sm">시작하기</Button>
        </HeaderActions>
      </HeaderContent>
    </Header>
  ),
}

// 네비게이션 포함
export const WithNavigation: Story = {
  render: () => (
    <Header position="static">
      <HeaderContent>
        <HeaderLogo>
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            H
          </div>
          <span className="font-semibold">Hanghae</span>
        </HeaderLogo>
        <HeaderNav>
          <a href="#" className="text-sm font-medium hover:text-primary">홈</a>
          <a href="#" className="text-sm font-medium hover:text-primary">제품</a>
          <a href="#" className="text-sm font-medium hover:text-primary">가격</a>
          <a href="#" className="text-sm font-medium hover:text-primary">문서</a>
        </HeaderNav>
        <HeaderActions>
          <Button variant="outline" size="sm">로그인</Button>
          <Button size="sm">회원가입</Button>
        </HeaderActions>
      </HeaderContent>
    </Header>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Header variant="default" position="static">
        <HeaderContent>
          <HeaderLogo>
            <span className="font-semibold">Default (shadow-sm)</span>
          </HeaderLogo>
        </HeaderContent>
      </Header>

      <Header variant="elevated" position="static">
        <HeaderContent>
          <HeaderLogo>
            <span className="font-semibold">Elevated (shadow-md)</span>
          </HeaderLogo>
        </HeaderContent>
      </Header>

      <Header variant="flat" position="static">
        <HeaderContent>
          <HeaderLogo>
            <span className="font-semibold">Flat (no shadow)</span>
          </HeaderLogo>
        </HeaderContent>
      </Header>
    </div>
  ),
}

// 유저 정보 포함
export const WithUserInfo: Story = {
  render: () => (
    <Header position="static">
      <HeaderContent>
        <HeaderLogo>
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            H
          </div>
          <div>
            <div className="font-semibold text-sm">Hanghae Company</div>
            <div className="text-xs text-muted-foreground">Design System</div>
          </div>
        </HeaderLogo>
        <HeaderActions>
          <div className="text-right mr-2">
            <div className="text-sm font-medium">Demo User</div>
            <div className="text-xs text-muted-foreground">demo@example.com</div>
          </div>
          <div className="size-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
            DU
          </div>
        </HeaderActions>
      </HeaderContent>
    </Header>
  ),
}
