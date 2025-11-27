import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/data'
import { Badge } from '@/components/primitives'

/**
 * Table 컴포넌트 스토리
 * shadcn/ui + CVA 기반 순수 UI 컴포넌트
 */

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 샘플 데이터
const invoices = [
  { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  { invoice: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
]

// 기본 테이블
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>최근 청구서 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// Striped 테이블
export const Striped: Story = {
  render: () => (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// Badge와 함께 사용
export const WithBadge: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === 'Paid'
                    ? 'default'
                    : invoice.status === 'Pending'
                    ? 'secondary'
                    : 'destructive'
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// 사용자 목록 예시
const users = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: 'User', status: 'Active' },
  { id: 3, name: '박지민', email: 'park@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: '최수진', email: 'choi@example.com', role: 'Editor', status: 'Active' },
]

export const UserList: Story = {
  render: () => (
    <Table>
      <TableCaption>사용자 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
