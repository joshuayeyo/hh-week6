import React from 'react'
import {
  Header,
  HeaderContent,
  HeaderLogo,
  HeaderActions,
} from './components/layout'
import { Button } from './components/primitives'
import { ManagementPage } from './pages/ManagementPage'
import './styles/components.css'

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <Header position="static">
        <HeaderContent>
          <HeaderLogo>
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              H
            </div>
            <span className="font-semibold">Hanghae Admin</span>
          </HeaderLogo>
          <HeaderActions>
            <Button variant="ghost" size="sm">설정</Button>
            <Button size="sm">로그아웃</Button>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <main>
        <ManagementPage />
      </main>
    </div>
  )
}
