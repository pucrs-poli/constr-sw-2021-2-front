

import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Menu, HomeOutlined, AccountCircle } from '@mui/icons-material';
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom';

export default function AppToolbar() {
    const navigate = useNavigate()
    const onHomeButtonClick = () => {
        navigate('/', { replace: true })
    }

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <Menu />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={onHomeButtonClick}
                >
                    <HomeOutlined />
                </IconButton>
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}