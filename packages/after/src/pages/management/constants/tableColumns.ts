import type { TableColumn } from '../types'

// 사용자 테이블 컬럼
export const USER_COLUMNS: TableColumn[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'username', header: '사용자명', width: '150px' },
  { key: 'email', header: '이메일' },
  { key: 'role', header: '역할', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'createdAt', header: '생성일', width: '120px' },
  { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
  { key: 'actions', header: '관리', width: '200px' },
]

// 게시글 테이블 컬럼
export const POST_COLUMNS: TableColumn[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: '제목' },
  { key: 'author', header: '작성자', width: '120px' },
  { key: 'category', header: '카테고리', width: '140px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'views', header: '조회수', width: '100px' },
  { key: 'createdAt', header: '작성일', width: '120px' },
  { key: 'actions', header: '관리', width: '250px' },
]

// 역할 옵션
export const ROLE_OPTIONS = [
  { value: 'user', label: '사용자' },
  { value: 'moderator', label: '운영자' },
  { value: 'admin', label: '관리자' },
]

// 사용자 상태 옵션
export const USER_STATUS_OPTIONS = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'suspended', label: '정지' },
]

// 카테고리 옵션
export const CATEGORY_OPTIONS = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'accessibility', label: 'Accessibility' },
]
