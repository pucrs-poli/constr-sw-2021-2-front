import { List, ListItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import './Home.scss';

export default function Home() {
    return (
        <main>
            <Typography>Esta é a Home.</Typography>
            <List>
                <ListItem>
                    <Link to="/tela1">Tela 1</Link>
                </ListItem>
                <ListItem>
                    <Link to="/tela2">Tela 2</Link>
                </ListItem>
            </List>
        </main>
    );
}