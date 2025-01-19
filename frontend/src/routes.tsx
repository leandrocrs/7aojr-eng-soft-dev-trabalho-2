import { createBrowserRouter, Outlet } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        children: [
            { index: true, lazy: () => import('./pages/home') },
            { path: "entrar", lazy: () => import('./pages/entrar') },
            { path: "cadastrar", lazy: () => import('./pages/cadastrar') },
            {
                path: "meus-clientes",
                element: <Outlet />,
                children: [
                    { index: true, lazy: () => import('./pages/meus-clientes') },
                    { path: ":id", lazy: () => import('./pages/meus-clientes/[id]') },
                ],
            },
            {
                path: "gestao-de-treinos",
                element: <Outlet />,
                children: [
                    { index: true, lazy: () => import('./pages/gestao-de-treinos') },
                    { path: "novo", lazy: () => import('./pages/gestao-de-treinos/novo') },
                    {
                        path: ":id",
                        element: <Outlet />,
                        children: [
                            { index: true, lazy: () => import('./pages/gestao-de-treinos/[id]') },
                            { path: "detalhes", lazy: () => import('./pages/gestao-de-treinos/[id]/detalhes') },
                            { path: "editar", lazy: () => import('./pages/gestao-de-treinos/[id]/editar') },
                        ],
                    },
                ],
            },
            {
                path: "minhas-playlists",
                element: <Outlet />,
                children: [
                    { index: true, lazy: () => import('./pages/minhas-playlists') },
                    { path: "nova", lazy: () => import('./pages/minhas-playlists/nova') },
                    {
                        path: ":id",
                        element: <Outlet />,
                        children: [
                            { path: "editar", lazy: () => import('./pages/minhas-playlists/[id]/editar') },
                            { path: "treinar", lazy: () => import('./pages/minhas-playlists/[id]/treinar') },
                        ],
                    },
                ],
            },
            { path: "desafios", lazy: () => import('./pages/desafios') },
            { path: "notificacoes", lazy: () => import('./pages/notificacoes') },
            { path: "meu-progresso", lazy: () => import('./pages/meu-progresso') },
            {
                path: "treinadores",
                element: <Outlet />,
                children: [
                    { path: ":username", lazy: () => import('./pages/treinadores/[username]') },
                ],
            },
        ],
    }
])