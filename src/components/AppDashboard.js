
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
                    <AppCard name="Turmas" description="Aqui você encontra as turmas" image={imgAulas} routeTo="turmas" />
                </Grid>

                <Grid item>
                    <AppCard name="Disciplinas" description="Aqui você encontra as disciplinas" image={imgAulas} routeTo="disciplinas" />
                </Grid>

                <Grid item>
                    <AppCard name="Exemplo" description="Descreva o card aqui" image={imgAulas} routeTo="tela1" />
                </Grid>

                <Grid item>
                    <AppCard name="Exemplo" description="Descreva o card aqui" image={imgAulas} routeTo="tela1" />
                </Grid>
            </Grid>
        </Box>
    )
}
