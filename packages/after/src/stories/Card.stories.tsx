import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/layout'
import { Button } from '@/components/primitives'

/**
 * Card 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 카드
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some example text.</p>
      </CardContent>
    </Card>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card variant="default" className="w-[350px]">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>기본 스타일 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>shadow-sm 적용</p>
        </CardContent>
      </Card>

      <Card variant="elevated" className="w-[350px]">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>강조된 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>shadow-md 적용</p>
        </CardContent>
      </Card>

      <Card variant="outline" className="w-[350px]">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
          <CardDescription>테두리만 있는 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>shadow 없음</p>
        </CardContent>
      </Card>
    </div>
  ),
}

// Footer 포함
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>계정 생성</CardTitle>
        <CardDescription>새로운 계정을 만들어 시작하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          이용약관에 동의하시면 계정이 생성됩니다.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">취소</Button>
        <Button>확인</Button>
      </CardFooter>
    </Card>
  ),
}

// 컨텐츠만 있는 카드
export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>헤더 없이 컨텐츠만 있는 카드입니다.</p>
      </CardContent>
    </Card>
  ),
}
