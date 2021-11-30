import { MenuBook, Search, Add } from "@mui/icons-material";
import { Button, InputAdornment, InputBase } from "@mui/material";
import { Box, width } from "@mui/system";
import UserTable from '../../components/Users/UserTable';

import './Users.css';

export default function Classes() {

    const mockClass = { name: 'Gabriel Rabelo', reg: '123456789', email: 'rabelo@example.com', roles: ['admin', 'professor'] };
    const mockClasses = Array(4).fill(mockClass);

    return (
        <Box sx={{mt: 4}} class="users-content">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <div class="title">
                    <MenuBook fontSize="large" style={{fill: "#647A79"}}/>
                    <Box sx={{ ml: 1 }}>
                        Usuários
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <InputBase
                        sx={{ mr: 1 }}
                        placeholder="Pesquisar"
                        inputProps={{
                            style:{
                                backgroundColor: '#F2F2F2',
                                color: "#647A79",
                                borderRadius: '6px',
                                padding: '7px 16px',
                                width: '120px',
                            }
                        }}
                    />
                    <Button variant="contained" startIcon={<Add/>}>Adicionar</Button>
                </Box>
            </Box>

            <UserTable items={mockClasses}></UserTable>
        </Box >
    );
}