import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from './App'
import { useAuth } from '../features/auth/hooks/useAuth'
import { ChatPage } from '../features/chat/ui/pages/ChatPage'
import { ForgotPasswordPage } from '../features/auth/ui/pages/ForgotPasswordPage'
import { LoginPage } from '../features/auth/ui/pages/LoginPage'
import { RegisterPage } from '../features/auth/ui/pages/RegisterPage'
import { VerifyEmailPage } from '../features/auth/ui/pages/VerifyEmailPage'
import { ResetPasswordPage } from '../features/auth/ui/pages/ResetPasswordPage'

function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user && !user.verified) {
    return <Navigate to="/verify-email" replace />
  }

  return children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/chat" replace /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },
      {
        path: 'chat',
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <Navigate to="/chat" replace /> },
    ],
  },
])
