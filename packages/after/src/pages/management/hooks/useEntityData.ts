import { useState, useEffect, useCallback } from 'react'
import { userService } from '../../../services/userService'
import { postService } from '../../../services/postService'
import type { EntityType, Entity, Stats } from '../types'
import type { User } from '../../../services/userService'
import type { Post } from '../../../services/postService'

interface UseEntityDataReturn {
  data: Entity[]
  loading: boolean
  loadData: () => Promise<void>
  createEntity: (formData: Record<string, string>) => Promise<void>
  updateEntity: (id: number, formData: Record<string, string>) => Promise<void>
  deleteEntity: (id: number) => Promise<void>
  handleStatusAction: (id: number, action: 'publish' | 'archive' | 'restore') => Promise<void>
  getStats: () => Stats
}

// 엔티티 데이터 관리 hook
export function useEntityData(
  entityType: EntityType,
  onSuccess: (message: string) => void,
  onError: (message: string) => void
): UseEntityDataReturn {
  const [data, setData] = useState<Entity[]>([])
  const [loading, setLoading] = useState(false)

  // 데이터 로드
  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = entityType === 'user'
        ? await userService.getAll()
        : await postService.getAll()
      setData(result)
    } catch {
      onError('데이터를 불러오는데 실패했습니다')
    } finally {
      setLoading(false)
    }
  }, [entityType, onError])

  // 엔티티 생성
  const createEntity = useCallback(async (formData: Record<string, string>) => {
    if (entityType === 'user') {
      await userService.create({
        username: formData.username,
        email: formData.email,
        role: (formData.role || 'user') as User['role'],
        status: (formData.status || 'active') as User['status'],
      })
    } else {
      await postService.create({
        title: formData.title,
        content: formData.content || '',
        author: formData.author,
        category: formData.category,
        status: (formData.status || 'draft') as Post['status'],
      })
    }
    await loadData()
    onSuccess(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`)
  }, [entityType, loadData, onSuccess])

  // 엔티티 수정
  const updateEntity = useCallback(async (id: number, formData: Record<string, string>) => {
    if (entityType === 'user') {
      await userService.update(id, formData)
    } else {
      await postService.update(id, formData)
    }
    await loadData()
    onSuccess(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`)
  }, [entityType, loadData, onSuccess])

  // 엔티티 삭제
  const deleteEntity = useCallback(async (id: number) => {
    if (entityType === 'user') {
      await userService.delete(id)
    } else {
      await postService.delete(id)
    }
    await loadData()
    onSuccess('삭제되었습니다')
  }, [entityType, loadData, onSuccess])

  // 상태 액션 (게시글 전용)
  const handleStatusAction = useCallback(async (
    id: number,
    action: 'publish' | 'archive' | 'restore'
  ) => {
    if (entityType !== 'post') return

    if (action === 'publish') await postService.publish(id)
    else if (action === 'archive') await postService.archive(id)
    else await postService.restore(id)

    await loadData()
    const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원'
    onSuccess(`${message}되었습니다`)
  }, [entityType, loadData, onSuccess])

  // 통계 계산
  const getStats = useCallback((): Stats => {
    if (entityType === 'user') {
      const users = data as User[]
      return {
        total: users.length,
        stat1: { label: '활성', value: users.filter(u => u.status === 'active').length, color: '#2e7d32' },
        stat2: { label: '비활성', value: users.filter(u => u.status === 'inactive').length, color: '#ed6c02' },
        stat3: { label: '정지', value: users.filter(u => u.status === 'suspended').length, color: '#d32f2f' },
        stat4: { label: '관리자', value: users.filter(u => u.role === 'admin').length, color: '#1976d2' },
      }
    }
    const posts = data as Post[]
    return {
      total: posts.length,
      stat1: { label: '게시됨', value: posts.filter(p => p.status === 'published').length, color: '#2e7d32' },
      stat2: { label: '임시저장', value: posts.filter(p => p.status === 'draft').length, color: '#ed6c02' },
      stat3: { label: '보관됨', value: posts.filter(p => p.status === 'archived').length, color: 'rgba(0, 0, 0, 0.6)' },
      stat4: { label: '총 조회수', value: posts.reduce((sum, p) => sum + p.views, 0), color: '#1976d2' },
    }
  }, [entityType, data])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    data, loading, loadData,
    createEntity, updateEntity, deleteEntity,
    handleStatusAction, getStats,
  }
}
