import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from '@/components/layout'
import { Button } from '@/components/primitives'

/**
 * Modal 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 모달
export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalOverlay onClick={() => setOpen(false)} />
          <ModalContent>
            <ModalClose onClick={() => setOpen(false)} />
            <ModalHeader>
              <ModalTitle>모달 제목</ModalTitle>
              <ModalDescription>
                모달에 대한 설명이 여기에 들어갑니다.
              </ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                모달 본문 내용입니다.
              </p>
            </div>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  },
}

// 사이즈 variants
export const Sizes: Story = {
  render: function Render() {
    const [size, setSize] = useState<'sm' | 'default' | 'lg' | 'xl' | null>(null)

    return (
      <>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSize('sm')}>Small</Button>
          <Button variant="outline" onClick={() => setSize('default')}>Default</Button>
          <Button variant="outline" onClick={() => setSize('lg')}>Large</Button>
          <Button variant="outline" onClick={() => setSize('xl')}>XL</Button>
        </div>
        <Modal open={size !== null} onOpenChange={() => setSize(null)}>
          <ModalOverlay onClick={() => setSize(null)} />
          <ModalContent size={size ?? 'default'}>
            <ModalClose onClick={() => setSize(null)} />
            <ModalHeader>
              <ModalTitle>Size: {size}</ModalTitle>
              <ModalDescription>
                모달 사이즈를 확인하세요.
              </ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                max-w-{size === 'sm' ? 'sm' : size === 'lg' ? '2xl' : size === 'xl' ? '4xl' : 'lg'} 적용
              </p>
            </div>
            <ModalFooter>
              <Button onClick={() => setSize(null)}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  },
}

// 확인 다이얼로그
export const ConfirmDialog: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          삭제하기
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalOverlay onClick={() => setOpen(false)} />
          <ModalContent size="sm">
            <ModalHeader>
              <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
              <ModalDescription>
                이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로 삭제됩니다.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  },
}

// 폼 모달
export const FormModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>새 항목 추가</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalOverlay onClick={() => setOpen(false)} />
          <ModalContent>
            <ModalClose onClick={() => setOpen(false)} />
            <ModalHeader>
              <ModalTitle>새 항목 추가</ModalTitle>
              <ModalDescription>
                아래 양식을 작성해주세요.
              </ModalDescription>
            </ModalHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  이름
                </label>
                <input
                  id="name"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>저장</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  },
}
