import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './screens/Auth/LoginScreen'
import HomeScreen from './screens/Dashboard/HomeScreen'
import ErrorBoundary from './components/ErrorBoundary'
import PlaceholderScreen from './screens/PlaceholderScreen'
import UserProfile from './screens/Profile/UserProfile'
import Orders from './screens/Orders/Orders'
import Vehicles from './screens/Vehicles/Vehicles'
import Customers from './screens/Customers/Customers'
import Calendar from './screens/Calendar/Calendar'
import Search from './screens/Search/Search'
import Settings from './screens/Settings/Settings'
import AdminUsers from './screens/AdminUsers/AdminUsers'
import Warehouse from './screens/Warehouse/Warehouse'
import Invoices from './screens/Invoices/Invoices'
import AiHelper from './screens/AiHelper/AiHelper'
import Messages from './screens/Messages/Messages'
import RegisterScreen from './screens/Auth/RegisterScreen'
import ResetPasswordScreen from './screens/Auth/ResetPasswordScreen'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ThemeProvider } from './screens/Theme/ThemeContext'


if (typeof window !== 'undefined') {
  const originalWarn = console.warn
  console.warn = (...args: any[]) => {
    const message = String(args[0] || '')
    if (
      message.includes('X4122') ||
      message.includes('X4008') ||
      message.includes('floating point') ||
      message.includes('precision') ||
      message.includes('WebGL')
    ) {
      return
    }
    originalWarn(...args)
  }
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          
          {}
          <Route path="/home" element={<ProtectedRoute><ErrorBoundary><HomeScreen /></ErrorBoundary></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/UserProfileScreen" element={<ProtectedRoute><Navigate to="/profile" replace /></ProtectedRoute>} />
          <Route path="/edit-profile" element={<PlaceholderScreen />} />
          <Route path="/list" element={<PlaceholderScreen />} />
          <Route path="/detail" element={<PlaceholderScreen />} />
          <Route path="/item-detail/:id" element={<PlaceholderScreen />} />
          <Route path="/notifications" element={<PlaceholderScreen />} />
          <Route path="/form" element={<PlaceholderScreen />} />
          <Route path="/payment" element={<PlaceholderScreen />} />
          <Route path="/transaction-details" element={<PlaceholderScreen />} />
          <Route path="/success" element={<PlaceholderScreen />} />
          <Route path="/order-history" element={<PlaceholderScreen />} />
          <Route path="/help-support" element={<PlaceholderScreen />} />
          <Route path="/admin" element={<PlaceholderScreen />} />
          <Route path="/location" element={<PlaceholderScreen />} />
          <Route path="/assigned-orders" element={<PlaceholderScreen />} />
          <Route path="/raport" element={<PlaceholderScreen />} />
          <Route path="/add-raport" element={<PlaceholderScreen />} />
        <Route path="/user-rapports" element={<PlaceholderScreen />} />
        
        {}
        <Route path="/orders" element={<ProtectedRoute requiredPermission="canViewOrders"><Orders /></ProtectedRoute>} />
        <Route path="/zlecenia" element={<ProtectedRoute requiredPermission="canViewOrders"><Navigate to="/orders" replace /></ProtectedRoute>} />
        
        {}
        <Route path="/vehicles" element={<ProtectedRoute requiredPermission="canViewVehicles"><Vehicles /></ProtectedRoute>} />
        <Route path="/pojazdy" element={<ProtectedRoute requiredPermission="canViewVehicles"><Navigate to="/vehicles" replace /></ProtectedRoute>} />
        
        {}
        <Route path="/customers" element={<ProtectedRoute requiredPermission="canViewCustomers"><Customers /></ProtectedRoute>} />
        <Route path="/klienci" element={<ProtectedRoute requiredPermission="canViewCustomers"><Navigate to="/customers" replace /></ProtectedRoute>} />
        
        {}
        <Route path="/calendar" element={<ProtectedRoute requiredPermission="canViewAppointments"><Calendar /></ProtectedRoute>} />
        <Route path="/kalendarz" element={<ProtectedRoute requiredPermission="canViewAppointments"><Navigate to="/calendar" replace /></ProtectedRoute>} />
        
        {}
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        
        {}
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        
        {}
        <Route path="/admin/users" element={<ProtectedRoute requiredPermission="canManageUsers"><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/uzytkownicy" element={<ProtectedRoute requiredPermission="canManageUsers"><Navigate to="/admin/users" replace /></ProtectedRoute>} />
        
        {}
        <Route path="/warehouse" element={<ProtectedRoute requiredPermission="canViewWarehouse"><Warehouse /></ProtectedRoute>} />
        <Route path="/magazyn" element={<ProtectedRoute requiredPermission="canViewWarehouse"><Navigate to="/warehouse" replace /></ProtectedRoute>} />
        
        {}
        <Route path="/invoices" element={<ProtectedRoute requiredPermission="canViewInvoices"><Invoices /></ProtectedRoute>} />
        <Route path="/faktury" element={<ProtectedRoute requiredPermission="canViewInvoices"><Navigate to="/invoices" replace /></ProtectedRoute>} />
        
        {}
        <Route path="/ai" element={<ProtectedRoute requiredPermission="canViewAiHelper"><AiHelper /></ProtectedRoute>} />
        
        {}
        <Route path="/messages" element={<ProtectedRoute requiredPermission="canViewMessages"><Messages /></ProtectedRoute>} />
        <Route path="/wiadomosci" element={<ProtectedRoute requiredPermission="canViewMessages"><Navigate to="/messages" replace /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
