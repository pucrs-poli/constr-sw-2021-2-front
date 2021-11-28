import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function AppCard(props) {
    const navigate = useNavigate();
    const onCardClick = () => {
        navigate(props.routeTo, { replace: true })
    }

    return (
        <Card sx={{ maxWidth: 224 }}>
            <CardActionArea sx={{ pt: 1 }} onClick={onCardClick}>
                <CardMedia
                    component="img"
                    image={props.image}
                    alt="imagem do card"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}