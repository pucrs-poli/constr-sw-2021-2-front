
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
                    <AppCard name="Alunos" description="Descreva o card aqui" image={imgAulas} routeTo="alunos" />
                </Grid>

                <Grid item>
                    <AppCard name="Exemplo" description="Descreva o card aqui" image={imgAulas} routeTo="tela1" />
                </Grid>

                <Grid item>
                    <AppCard name="Exemplo" description="Descreva o card aqui" image={imgAulas} routeTo="tela1" />
                </Grid>

                <Grid item>
                    <AppCard name="Usuários" description="Aqui você encontra os usuários" image={imgAulas} routeTo="usuarios" />
                </Grid>
            </Grid>
        </Box>
    )
}
