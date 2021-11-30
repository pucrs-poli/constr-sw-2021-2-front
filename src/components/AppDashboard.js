
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import AppCard from "./AppCard";
import imgAulas from '../assets/aula.png';

export default function AppDashboard() {
    return (
        <Box sx={{ mx: 6 }}>
            <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid item>
                    <AppCard name="Aulas" description="Aqui você encontra aulas e reservas" image={imgAulas} routeTo="aulas" />
                </Grid>

                <Grid item>
                    <AppCard name="Recursos" description="Aqui você encontra os tipos de recursos e recursos" image={imgAulas} routeTo="tipos_recursos" />
                </Grid>

                <Grid item>
                    <AppCard name="Exemplo" description="Descreva o card aqui" image={imgAulas} route="tela1" />
                </Grid>

                <Grid item>
                    <AppCard name="Exemplo" description="Descreva o card aqui" image={imgAulas} route="tela1" />
                </Grid>
            </Grid>
        </Box>
    )
}