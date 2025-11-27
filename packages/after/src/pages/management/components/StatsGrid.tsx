import type { Stats } from '../types'

// Props 타입 정의
export interface StatsGridProps {
  stats: Stats
}

// 통계 카드 스타일 (다크모드 지원)
const STAT_STYLES = {
  total: 'bg-primary-light border-primary-light-border',
  stat1: 'bg-success-light border-success-light-border',
  stat2: 'bg-warning-light border-warning-light-border',
  stat3: 'bg-destructive-light border-destructive-light-border',
  stat4: 'bg-neutral-light border-neutral-light-border',
} as const

const VALUE_STYLES = {
  total: 'text-primary',
  stat1: 'text-success',
  stat2: 'text-warning',
  stat3: 'text-destructive',
  stat4: 'text-neutral',
} as const

// 통계 그리드 컴포넌트
export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3 mb-4">
      <StatCard label="전체" value={stats.total} colorKey="total" />
      <StatCard label={stats.stat1.label} value={stats.stat1.value} colorKey="stat1" />
      <StatCard label={stats.stat2.label} value={stats.stat2.value} colorKey="stat2" />
      <StatCard label={stats.stat3.label} value={stats.stat3.value} colorKey="stat3" />
      <StatCard label={stats.stat4.label} value={stats.stat4.value} colorKey="stat4" />
    </div>
  )
}

// 통계 카드 컴포넌트
interface StatCardProps {
  label: string
  value: number
  colorKey: keyof typeof STAT_STYLES
}

function StatCard({ label, value, colorKey }: StatCardProps) {
  return (
    <div className={`p-3 border rounded ${STAT_STYLES[colorKey]}`}>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={`text-2xl font-bold ${VALUE_STYLES[colorKey]}`}>{value}</div>
    </div>
  )
}
