import { Devices, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from '../../components/AppTable';

import './ResourceTypes.css';

export default function ResourceTypes() {

    const mockResourceType = { title: 'Computadores', link: '/recursos', params: {tipo_recurso_id: 1} };
    const mockResourceTypes = Array(4).fill(mockResourceType);

    return (
        <Box sx={{ mx: { lg: 24, xl: 36 }, mt: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <div class="title">
                    <Devices fontSize="large" />
                    <Box sx={{ ml: 1 }}>
                        Tipos de recursos
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField id="outlined-basic" placeholder="Pesquisar tipo de recurso" variant="filled" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <Search />
                            </InputAdornment>
                        ),
                        style: {
                            backgroundColor: 'white'
                        },
                    }} />
                </Box>
            </Box>

            <AppTable items={mockResourceTypes}></AppTable>
        </Box >
    );
}