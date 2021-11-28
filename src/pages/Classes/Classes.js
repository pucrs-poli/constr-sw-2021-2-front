import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from '../../components/AppTable';

import './Classes.css';

export default function Classes() {

    const mockClass = { title: 'Construção de Software', group: 'T102', resources: 'Notebook #32' };
    const mockClasses = Array(4).fill(mockClass);

    return (
        <Box sx={{ mx: { lg: 24, xl: 36 }, mt: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <div class="title">
                    <MenuBook fontSize="large" />
                    <Box sx={{ ml: 1 }}>
                        Aulas
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField id="outlined-basic" label="Pesquisar aula" variant="outlined" inputProps={{
                        startAdornment: (
                            < InputAdornment position="start" >
                                <Search />
                            </InputAdornment>
                        )
                    }} />
                </Box>
            </Box>

            <AppTable items={mockClasses}></AppTable>
        </Box >
    );
}