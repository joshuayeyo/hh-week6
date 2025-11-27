import type { Stats } from '../types'

// 스타일 상수
const GRID_STYLE = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
  gap: '10px',
  marginBottom: '15px',
} as const

const STAT_COLORS = {
  total: { bg: '#e3f2fd', border: '#90caf9', text: '#1976d2' },
  stat1: { bg: '#e8f5e9', border: '#81c784', text: '#388e3c' },
  stat2: { bg: '#fff3e0', border: '#ffb74d', text: '#f57c00' },
  stat3: { bg: '#ffebee', border: '#e57373', text: '#d32f2f' },
  stat4: { bg: '#f5f5f5', border: '#bdbdbd', text: '#424242' },
} as const

// Props 타입 정의
export interface StatsGridProps {
  stats: Stats
}

// 통계 그리드 컴포넌트
export function StatsGrid({ stats }: StatsGridProps) {
  const cardStyle = (colorKey: keyof typeof STAT_COLORS) => ({
    padding: '12px 15px',
    background: STAT_COLORS[colorKey].bg,
    border: `1px solid ${STAT_COLORS[colorKey].border}`,
    borderRadius: '3px',
  })

  const labelStyle = { fontSize: '12px', color: '#666', marginBottom: '4px' }
  const valueStyle = (colorKey: keyof typeof STAT_COLORS) => ({
    fontSize: '24px',
    fontWeight: 'bold' as const,
    color: STAT_COLORS[colorKey].text,
  })

  return (
    <div style={GRID_STYLE}>
      <div style={cardStyle('total')}>
        <div style={labelStyle}>전체</div>
        <div style={valueStyle('total')}>{stats.total}</div>
      </div>
      <div style={cardStyle('stat1')}>
        <div style={labelStyle}>{stats.stat1.label}</div>
        <div style={valueStyle('stat1')}>{stats.stat1.value}</div>
      </div>
      <div style={cardStyle('stat2')}>
        <div style={labelStyle}>{stats.stat2.label}</div>
        <div style={valueStyle('stat2')}>{stats.stat2.value}</div>
      </div>
      <div style={cardStyle('stat3')}>
        <div style={labelStyle}>{stats.stat3.label}</div>
        <div style={valueStyle('stat3')}>{stats.stat3.value}</div>
      </div>
      <div style={cardStyle('stat4')}>
        <div style={labelStyle}>{stats.stat4.label}</div>
        <div style={valueStyle('stat4')}>{stats.stat4.value}</div>
      </div>
    </div>
  )
}
