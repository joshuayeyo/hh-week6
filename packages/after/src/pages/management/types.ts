/* eslint-disable react-refresh/only-export-components */
import type { User } from '../../services/userService'
import type { Post } from '../../services/postService'

// 엔티티 타입 정의
export type EntityType = 'user' | 'post'
export type Entity = User | Post

// 폼 데이터 타입
export interface UserFormData {
  username: string
  email: string
  role: string
  status: string
}

export interface PostFormData {
  title: string
  content: string
  author: string
  category: string
  status: string
}

export type FormData = UserFormData | PostFormData | Record<string, string>

// 테이블 컬럼 타입
export interface TableColumn {
  key: string
  header: string
  width?: string
}

// 통계 타입
export interface StatItem {
  label: string
  value: number
  color: string
}

export interface Stats {
  total: number
  stat1: StatItem
  stat2: StatItem
  stat3: StatItem
  stat4: StatItem
}
