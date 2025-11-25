import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'

/**
 * Alert 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 알림
export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <Alert variant="default">
        <Info className="h-4 w-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>
          기본 알림 메시지입니다.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          오류가 발생했습니다. 다시 시도해주세요.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// 아이콘 사용 예시
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          정보성 알림 메시지입니다.
        </AlertDescription>
      </Alert>

      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          작업이 성공적으로 완료되었습니다.
        </AlertDescription>
      </Alert>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          주의가 필요한 경고 메시지입니다.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          오류가 발생했습니다.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// 간단한 알림 (제목 없이)
export const SimpleAlert: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          간단한 정보 메시지입니다.
        </AlertDescription>
      </Alert>
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          저장되었습니다.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
