import { useState, useCallback } from 'react'
import type { Entity, EntityType, FormData } from '../types'
import type { User } from '../../../services/userService'
import type { Post } from '../../../services/postService'

interface UseEntityFormReturn {
  formData: FormData
  selectedItem: Entity | null
  isCreateOpen: boolean
  isEditOpen: boolean
  setFormValue: (key: string, value: string) => void
  openCreate: () => void
  openEdit: (item: Entity, entityType: EntityType) => void
  closeModals: () => void
  resetForm: () => void
}

// 폼 상태 관리 hook
export function useEntityForm(): UseEntityFormReturn {
  const [formData, setFormData] = useState<FormData>({})
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const setFormValue = useCallback((key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }, [])

  const openCreate = useCallback(() => {
    setFormData({})
    setIsCreateOpen(true)
  }, [])

  const openEdit = useCallback((item: Entity, entityType: EntityType) => {
    setSelectedItem(item)
    if (entityType === 'user') {
      const user = item as User
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    } else {
      const post = item as Post
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      })
    }
    setIsEditOpen(true)
  }, [])

  const closeModals = useCallback(() => {
    setIsCreateOpen(false)
    setIsEditOpen(false)
    setFormData({})
    setSelectedItem(null)
  }, [])

  const resetForm = useCallback(() => {
    setFormData({})
    setSelectedItem(null)
  }, [])

  return {
    formData, selectedItem,
    isCreateOpen, isEditOpen,
    setFormValue, openCreate, openEdit, closeModals, resetForm,
  }
}
