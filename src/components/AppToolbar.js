

import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Menu, HomeOutlined, AccountCircle } from '@mui/icons-material';
import { Box } from "@mui/system";

export default function AppToolbar() {
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