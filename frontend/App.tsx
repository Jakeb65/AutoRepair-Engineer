import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './src/screens/Auth/LoginScreen'
import RegisterScreen from './src/screens/Auth/RegisterScreen'
import HomeScreen from './src/screens/Dashboard/HomeScreen'
import ClientDashboard from './src/screens/ClientDashboard/ClientDashboard'
import PlaceholderScreen from './src/screens/PlaceholderScreen'
import UserProfile from './src/screens/Profile/UserProfile'
import Orders from './src/screens/Orders/Orders'
import Vehicles from './src/screens/Vehicles/Vehicles'
import Customers from './src/screens/Customers/Customers'
import Calendar from './src/screens/Calendar/Calendar'
import Search from './src/screens/Search/Search'
import Settings from './src/screens/Settings/Settings'
import AdminUsers from './src/screens/AdminUsers/AdminUsers'
import Warehouse from './src/screens/Warehouse/Warehouse'
import Invoices from './src/screens/Invoices/Invoices'
import AiHelper from './src/screens/AiHelper/AiHelper'
import Messages from './src/screens/Messages/Messages'
import VehicleInteractive from './src/screens/Interactive/VehicleInteractive'
import { getToken } from './src/utils/api'

type JwtPayload = {
  id?: number
  mail?: string
  rola?: string
  exp?: number
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

function getRoleFromToken(): string | null {
  const token = getToken()
  if (!token) return null
  const decoded = decodeJwt(token)
  return decoded?.rola ?? null
}

function HomeGate() {
  const token = getToken()
  if (!token) return <Navigate to="/login" replace />

  const role = getRoleFromToken()
  if (role === 'user') return <ClientDashboard />
  return <HomeScreen />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Start: jeśli jest token -> dashboard wg roli, jeśli nie -> login */}
        <Route path="/" element={<HomeGate />} />

        {/* Auth */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/reset-password" element={<RegisterScreen />} />

        {/* Dashboardy */}
        <Route path="/home" element={<HomeGate />} />
        <Route path="/client" element={<ClientDashboard />} />

        {/* Twoje ekrany */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/UserProfileScreen" element={<Navigate to="/profile" replace />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/zlecenia" element={<Navigate to="/orders" replace />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/pojazdy" element={<Navigate to="/vehicles" replace />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/klienci" element={<Navigate to="/customers" replace />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/kalendarz" element={<Navigate to="/calendar" replace />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/uzytkownicy" element={<Navigate to="/admin/users" replace />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/magazyn" element={<Navigate to="/warehouse" replace />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/faktury" element={<Navigate to="/invoices" replace />} />
        <Route path="/ai" element={<AiHelper />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/wiadomosci" element={<Navigate to="/messages" replace />} />
        <Route path="/interactive-vehicle" element={<VehicleInteractive />} />
        <Route path="/Interaktywne" element={<Navigate to="/interactive-vehicle" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
