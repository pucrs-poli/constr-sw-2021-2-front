import { Person } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { Box } from "@mui/system";
import UserTable from '../../components/Users/UserTable';
import UserModalCreate from '../../components/Users/Modals/UserModalCreate';

import './Users.css';

export default function Users() {

    const mockUser = { name: 'Gabriel Rabelo', reg: '123456789', email: 'rabelo@example.com', roles: ['admin', 'professor'] };
    const mockUsers = Array(10).fill(mockUser);

    return (
        <div>
            <Box sx={{mt: 4}} class="users-content">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <div class="title">
                        <Person fontSize="large" style={{fill: "#647A79"}}/>
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
                                    width: '150px',
                                }
                            }}
                        />
                        <UserModalCreate/>
                    </Box>
                </Box>

                <UserTable items={mockUsers}></UserTable>
            </Box >
        </div>
    );
}