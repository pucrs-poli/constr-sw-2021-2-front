import { Typography } from "@mui/material";
import AppDashboard from "../../components/AppDashboard";

export default function Home() {
    return (
        <main>
            <Typography sx={{ flexGrow: 1, textAlign: 'center', my: 2 }} variant="h6">Escolinha do Professor Arruda</Typography>
            <AppDashboard />
        </main>
    );
}
