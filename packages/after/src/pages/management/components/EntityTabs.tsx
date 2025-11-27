import type { EntityType } from '../types'
import { cn } from '@/lib/utils'

// Props 타입 정의
export interface EntityTabsProps {
  entityType: EntityType
  onChange: (type: EntityType) => void
}

// 엔티티 타입 전환 탭 컴포넌트
export function EntityTabs({ entityType, onChange }: EntityTabsProps) {
  const tabClass = (isActive: boolean) =>
    cn(
      'px-4 py-2 text-sm border rounded cursor-pointer transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground font-bold mr-1'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
    )

  return (
    <div className="mb-4 border-b-2 border-border pb-2">
      <button onClick={() => onChange('post')} className={tabClass(entityType === 'post')}>
        게시글
      </button>
      <button onClick={() => onChange('user')} className={tabClass(entityType === 'user')}>
        사용자
      </button>
    </div>
  )
}
