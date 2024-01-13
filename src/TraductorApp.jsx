import { AuthProvider } from "./auth/context/AuthContext"
import { SocketProvider } from "./context/SocketContext"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const TraductorApp = () => {
  return (
    // <AuthProvider>
      // <SocketProvider>
        <AppTheme>
            <AppRouter/>
        </AppTheme>
    //   </SocketProvider>
    // </AuthProvider>
  )
}
