import { Box, Button, Dialog, Typography } from "@mui/material";
import { useNavigate } from "react-router";

type RegisterSuccessDialogProps = {
    open: boolean;
    onClose: () => void;
}

export function RegisterSuccessDialog({ open, onClose }: RegisterSuccessDialogProps) {
    const navigate = useNavigate();

    return (
        <Dialog onClose={(reason) => {
            if (reason === 'backdropClick') {
                return;
            }

            onClose()
        }} open={open} >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Conta registrada com sucesso!</Typography>

                <Button onClick={() => {
                    navigate('/entrar')
                }}>Entrar na sua conta</Button>
            </Box>
        </Dialog>
    );
}