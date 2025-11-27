import type { EntityType } from '../types'

// 스타일 상수
const TAB_BASE_STYLE = {
  padding: '8px 16px',
  fontSize: '14px',
  border: '1px solid #999',
  cursor: 'pointer',
  borderRadius: '3px',
} as const

// Props 타입 정의
export interface EntityTabsProps {
  entityType: EntityType
  onChange: (type: EntityType) => void
}

// 엔티티 타입 전환 탭 컴포넌트
export function EntityTabs({ entityType, onChange }: EntityTabsProps) {
  const getTabStyle = (isActive: boolean) => ({
    ...TAB_BASE_STYLE,
    marginRight: isActive ? '5px' : '0',
    fontWeight: isActive ? 'bold' : 'normal',
    background: isActive ? '#1976d2' : '#f5f5f5',
    color: isActive ? 'white' : '#333',
  })

  return (
    <div style={{ marginBottom: '15px', borderBottom: '2px solid #ccc', paddingBottom: '5px' }}>
      <button onClick={() => onChange('post')} style={getTabStyle(entityType === 'post')}>
        게시글
      </button>
      <button onClick={() => onChange('user')} style={getTabStyle(entityType === 'user')}>
        사용자
      </button>
    </div>
  )
}
