import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AwesomeButton } from "react-awesome-button";

function StreamCard(props) {
    return (
        <Grid item xs={3}>
            <Card style={{boxShadow: '5px 5px lightblue'}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={props.preview.large}
                        title={props.channel.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.channel.display_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.game}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.viewers} watching right now
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default StreamCard;