import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from '@/components/data'
import { Button } from '@/components/primitives'
import { Badge } from '@/components/primitives'
import type { EntityType, Entity, TableColumn } from '../types'
import type { User } from '../../../services/userService'
import type { Post } from '../../../services/postService'
import { USER_COLUMNS, POST_COLUMNS } from '../constants/tableColumns'

// Props 타입 정의
export interface EntityTableProps {
  entityType: EntityType
  data: Entity[]
  onEdit: (item: Entity) => void
  onDelete: (id: number) => void
  onPublish?: (id: number) => void
  onArchive?: (id: number) => void
  onRestore?: (id: number) => void
}

// 상태 뱃지 렌더링
function renderStatusBadge(status: string, entityType: EntityType) {
  const statusConfig = entityType === 'user'
    ? { active: 'default', inactive: 'secondary', suspended: 'destructive' }
    : { published: 'default', draft: 'secondary', archived: 'outline' }

  const variant = statusConfig[status as keyof typeof statusConfig] || 'secondary'
  const label = entityType === 'user'
    ? { active: '활성', inactive: '비활성', suspended: '정지' }[status]
    : { published: '게시됨', draft: '임시저장', archived: '보관됨' }[status]

  return <Badge variant={variant as 'default' | 'secondary' | 'destructive' | 'outline'}>{label}</Badge>
}

// 테이블 셀 렌더링
function renderCell(item: Entity, column: TableColumn, entityType: EntityType) {
  const key = column.key
  if (key === 'status') {
    const status = entityType === 'user' ? (item as User).status : (item as Post).status
    return renderStatusBadge(status, entityType)
  }
  if (key === 'role' && entityType === 'user') {
    const roleLabels: Record<string, string> = { admin: '관리자', moderator: '운영자', user: '사용자' }
    return roleLabels[(item as User).role] || (item as User).role
  }
  // 공통 필드 처리
  const itemAny = item as unknown as Record<string, unknown>
  return itemAny[key]?.toString() || '-'
}

// 엔티티 테이블 컴포넌트
export function EntityTable({
  entityType, data, onEdit, onDelete, onPublish, onArchive, onRestore
}: EntityTableProps) {
  const columns = entityType === 'user' ? USER_COLUMNS : POST_COLUMNS

  return (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          {columns.map(col => (
            <TableHead key={col.key} style={{ width: col.width }}>{col.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.id}>
            {columns.map(col => (
              <TableCell key={col.key}>
                {col.key === 'actions' ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(item)}>수정</Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>삭제</Button>
                    {entityType === 'post' && (item as Post).status === 'draft' && (
                      <Button variant="default" size="sm" onClick={() => onPublish?.(item.id)}>게시</Button>
                    )}
                    {entityType === 'post' && (item as Post).status === 'published' && (
                      <Button variant="secondary" size="sm" onClick={() => onArchive?.(item.id)}>보관</Button>
                    )}
                    {entityType === 'post' && (item as Post).status === 'archived' && (
                      <Button variant="outline" size="sm" onClick={() => onRestore?.(item.id)}>복원</Button>
                    )}
                  </div>
                ) : renderCell(item, col, entityType)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
