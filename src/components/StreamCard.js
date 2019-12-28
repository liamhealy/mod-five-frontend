import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function StreamCard(props) {

    const getThumbnail = () => {
        let url = props.thumbnail_url
        url = url.replace("{width}", "400");
        url = url.replace("{height}", "300");
        return url;
    }

    return (
        <Grid item xs={3}>
            <Card style={{boxShadow: '5px 5px lightblue'}} onClick={() => props.handleClick(props.user_name)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={getThumbnail()}
                        title={props.user_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.user_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <span style={{color: 'green'}}>{props.viewer_count}</span> watching right now
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default StreamCard;