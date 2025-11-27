import { useState, useEffect } from 'react'
import { Button } from '@/components/primitives'
import { Alert, AlertDescription } from '@/components/feedback'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalTitle, ModalClose
} from '@/components/layout'
import { useAlert, useEntityData, useEntityForm } from './management/hooks'
import { EntityTabs, StatsGrid, EntityFormFields, EntityTable } from './management/components'
import type { EntityType, FormData } from './management/types'
import '../styles/components.css'

// 스타일 상수 (Tailwind 클래스 사용)
const PAGE_CLASS = 'min-h-screen bg-background-secondary'
const CONTAINER_CLASS = 'max-w-6xl mx-auto p-5'
const CARD_CLASS = 'bg-card border border-border p-4 rounded-md'

// 관리 페이지 컴포넌트
export function ManagementPage() {
  const [entityType, setEntityType] = useState<EntityType>('post')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { alert, showSuccess, showError, hideSuccess: _hs, hideError: _he } = useAlert()
  const {
    data, createEntity, updateEntity, deleteEntity, handleStatusAction, getStats
  } = useEntityData(entityType, showSuccess, showError)
  const {
    formData, selectedItem, isCreateOpen, isEditOpen,
    setFormValue, openCreate, openEdit, closeModals
  } = useEntityForm()

  // 엔티티 타입 변경 시 모달 닫기
  useEffect(() => { closeModals() }, [entityType, closeModals])

  // 생성 핸들러
  const handleCreate = async () => {
    try {
      await createEntity(formData as Record<string, string>)
      closeModals()
    } catch (e: unknown) {
      showError((e as Error).message || '생성에 실패했습니다')
    }
  }

  // 수정 핸들러
  const handleUpdate = async () => {
    if (!selectedItem) return
    try {
      await updateEntity(selectedItem.id, formData as Record<string, string>)
      closeModals()
    } catch (e: unknown) {
      showError((e as Error).message || '수정에 실패했습니다')
    }
  }

  // 삭제 핸들러
  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      await deleteEntity(id)
    } catch (e: unknown) {
      showError((e as Error).message || '삭제에 실패했습니다')
    }
  }

  return (
    <div className={PAGE_CLASS}>
      <div className={CONTAINER_CLASS}>
        <PageHeader />
        <div className={CARD_CLASS}>
          <EntityTabs entityType={entityType} onChange={setEntityType} />
          <div style={{ marginBottom: '15px', textAlign: 'right' }}>
            <Button variant="default" size="default" onClick={openCreate}>새로 만들기</Button>
          </div>
          {alert.showSuccess && (
            <Alert variant="default" className="mb-3">
              <AlertDescription>{alert.successMessage}</AlertDescription>
            </Alert>
          )}
          {alert.showError && (
            <Alert variant="destructive" className="mb-3">
              <AlertDescription>{alert.errorMessage}</AlertDescription>
            </Alert>
          )}
          <StatsGrid stats={getStats()} />
          <EntityTable
            entityType={entityType} data={data}
            onEdit={(item) => openEdit(item, entityType)} onDelete={handleDelete}
            onPublish={(id) => handleStatusAction(id, 'publish')}
            onArchive={(id) => handleStatusAction(id, 'archive')}
            onRestore={(id) => handleStatusAction(id, 'restore')}
          />
        </div>
      </div>
      <EntityModal
        open={isCreateOpen} onClose={closeModals} onSubmit={handleCreate}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`} submitLabel="생성"
        entityType={entityType} formData={formData} onChange={setFormValue}
      />
      <EntityModal
        open={isEditOpen} onClose={closeModals} onSubmit={handleUpdate}
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`} submitLabel="수정 완료"
        entityType={entityType} formData={formData} onChange={setFormValue}
      />
    </div>
  )
}

// 페이지 헤더
function PageHeader() {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold mb-1 text-foreground">
        관리 시스템
      </h1>
      <p className="text-muted-foreground text-sm">사용자와 게시글을 관리하세요</p>
    </div>
  )
}

// 엔티티 모달
interface EntityModalProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  submitLabel: string
  entityType: EntityType
  formData: FormData
  onChange: (key: string, value: string) => void
}

function EntityModal({
  open, onClose, onSubmit, title, submitLabel, entityType, formData, onChange
}: EntityModalProps) {
  return (
    <Modal open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalClose onClick={onClose} />
        </ModalHeader>
        <EntityFormFields entityType={entityType} formData={formData} onChange={onChange} />
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button variant="default" onClick={onSubmit}>{submitLabel}</Button>
        </div>
      </ModalContent>
    </Modal>
  )
}
