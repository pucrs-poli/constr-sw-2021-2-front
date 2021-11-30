import { Devices, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppTable from '../../components/AppTable';

import './Resources.css';

export default function Resources() {
    const [params, setParams] = React.useState([]);

    const fetchResourceType= async (id) => {
        //pega tipo de recurso
        //resourceType = Api.getResourceTypeById(id);
    };

    const fetchResources= async (id) => {
        //pega recursos daquele tipo
        //resources = Api.getResourcesByResourceTypeId(id);
    };

    const mockResource = { title: 'Computador 1', link: '/recurso', params: {recurso_id: 1} };
    const mockResources = Array(4).fill(mockResource);

    return (
        <Box sx={{ mx: { lg: 24, xl: 36 }, mt: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <div class="title">
                    <Devices fontSize="large" />
                    <Box sx={{ ml: 1 }}>
                        {/* resourceType.nome */}
                        Nome do tipo de recurso
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField id="outlined-basic" placeholder="Pesquisar recurso" variant="filled" InputProps={{
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

            <p>Recursos</p>
            <AppTable items={mockResources}></AppTable>
        </Box >
    );
}