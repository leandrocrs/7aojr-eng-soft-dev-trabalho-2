import FitnessCenter from "@mui/icons-material/FitnessCenter";
import { AppBar, Toolbar, Typography } from "@mui/material";

export function PublicAppBar() {
    return <AppBar position="static">
        <Toolbar>
            <FitnessCenter sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pulse FIT
            </Typography>
        </Toolbar>
    </AppBar>
}