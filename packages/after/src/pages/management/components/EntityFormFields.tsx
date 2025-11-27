import { Input, Select, SelectOption, Textarea, Label } from '@/components/forms'
import type { EntityType, FormData } from '../types'
import { ROLE_OPTIONS, USER_STATUS_OPTIONS, CATEGORY_OPTIONS } from '../constants/tableColumns'

// Props 타입 정의
export interface EntityFormFieldsProps {
  entityType: EntityType
  formData: FormData
  onChange: (key: string, value: string) => void
}

// 사용자 폼 필드
function UserFormFields({ formData, onChange }: Omit<EntityFormFieldsProps, 'entityType'>) {
  const data = formData as Record<string, string>

  return (
    <>
      <div className="space-y-2 mb-4">
        <Label>사용자명</Label>
        <Input
          name="username"
          value={data.username || ''}
          onChange={(e) => onChange('username', e.target.value)}
          placeholder="사용자명을 입력하세요"
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label>이메일</Label>
        <Input
          name="email"
          type="email"
          value={data.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="이메일을 입력하세요"
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="space-y-2">
          <Label>역할</Label>
          <Select
            name="role"
            value={data.role || 'user'}
            onChange={(e) => onChange('role', e.target.value)}
          >
            {ROLE_OPTIONS.map(opt => (
              <SelectOption key={opt.value} value={opt.value}>{opt.label}</SelectOption>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>상태</Label>
          <Select
            name="status"
            value={data.status || 'active'}
            onChange={(e) => onChange('status', e.target.value)}
          >
            {USER_STATUS_OPTIONS.map(opt => (
              <SelectOption key={opt.value} value={opt.value}>{opt.label}</SelectOption>
            ))}
          </Select>
        </div>
      </div>
    </>
  )
}

// 게시글 폼 필드
function PostFormFields({ formData, onChange }: Omit<EntityFormFieldsProps, 'entityType'>) {
  const data = formData as Record<string, string>

  return (
    <>
      <div className="space-y-2 mb-4">
        <Label>제목</Label>
        <Input
          name="title"
          value={data.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="게시글 제목을 입력하세요"
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="mb-4">
        <div className="space-y-2">
          <Label>작성자</Label>
          <Input
            name="author"
            value={data.author || ''}
            onChange={(e) => onChange('author', e.target.value)}
            placeholder="작성자명"
          />
        </div>
        <div className="space-y-2">
          <Label>카테고리</Label>
          <Select
            name="category"
            value={data.category || ''}
            onChange={(e) => onChange('category', e.target.value)}
          >
            <SelectOption value="" disabled>카테고리 선택</SelectOption>
            {CATEGORY_OPTIONS.map(opt => (
              <SelectOption key={opt.value} value={opt.value}>{opt.label}</SelectOption>
            ))}
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>내용</Label>
        <Textarea
          name="content"
          value={data.content || ''}
          onChange={(e) => onChange('content', e.target.value)}
          placeholder="게시글 내용을 입력하세요"
          rows={6}
        />
      </div>
    </>
  )
}

// 엔티티 폼 필드 (분기)
export function EntityFormFields({ entityType, formData, onChange }: EntityFormFieldsProps) {
  return entityType === 'user'
    ? <UserFormFields formData={formData} onChange={onChange} />
    : <PostFormFields formData={formData} onChange={onChange} />
}
