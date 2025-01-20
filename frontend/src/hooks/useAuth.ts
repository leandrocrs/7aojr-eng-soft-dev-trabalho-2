import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { AuthService } from "../services/auth-service"

export function useAuth() {
    const navigate = useNavigate()

    const [authenticated, setAuthenticated] = useState(false)
    const [state, setState] = useState<'STALE' | 'INITIALIZED'>('STALE');
    const [token, setToken] = useState<string | null>(null)

    const login = async (username: string, password: string) => {
        await AuthService.login(username, password);

        setAuthenticated(true);
    }

    const logout = () => {
        AuthService.logout();

        setAuthenticated(false);
    }

    const redirectToLogin = () => {
        navigate('/entrar')
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await AuthService.isAuthenticated()
            const token = await AuthService.getToken()

            setAuthenticated(isAuthenticated)
            setToken(token)
            setState('INITIALIZED')
        }

        checkAuthentication()
    }, [])

    const userInfo = useMemo(() => {
        if (authenticated) {
            return AuthService.getUserInfo()
        }

        return null
    }, [authenticated])

    return {
        state,
        authenticated,
        userInfo,
        login,
        logout,
        redirectToLogin,
        token,
    }
}