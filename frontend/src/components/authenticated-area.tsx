import { useEffect } from "react";
import { Outlet } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { FitnessCenter, Logout } from "@mui/icons-material";

export function AuthenticatedArea() {
    const { state, authenticated, redirectToLogin, logout } = useAuth();

    useEffect(() => {
        if (state === 'INITIALIZED' && !authenticated) {
            redirectToLogin();
        }
    }, [state, authenticated, redirectToLogin]);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <FitnessCenter sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pulse FIT
                    </Typography>
                    {authenticated ? <Button type="button" variant="outlined" startIcon={<Logout />} onClick={logout}>Sair</Button> : null}
                </Toolbar>
            </AppBar>
            <main>
                <Outlet />
            </main>
        </Box >
    )
}