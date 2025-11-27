import { useState, useCallback } from 'react'

interface AlertState {
  showSuccess: boolean
  showError: boolean
  successMessage: string
  errorMessage: string
}

// 알림 상태 관리 hook
export function useAlert() {
  const [alert, setAlert] = useState<AlertState>({
    showSuccess: false,
    showError: false,
    successMessage: '',
    errorMessage: '',
  })

  const showSuccess = useCallback((message: string) => {
    setAlert(prev => ({ ...prev, showSuccess: true, successMessage: message }))
  }, [])

  const showError = useCallback((message: string) => {
    setAlert(prev => ({ ...prev, showError: true, errorMessage: message }))
  }, [])

  const hideSuccess = useCallback(() => {
    setAlert(prev => ({ ...prev, showSuccess: false }))
  }, [])

  const hideError = useCallback(() => {
    setAlert(prev => ({ ...prev, showError: false }))
  }, [])

  return { alert, showSuccess, showError, hideSuccess, hideError }
}
