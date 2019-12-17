import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-eric.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ForumCard(props) {
  const classes = useStyles();
  let user = props.attributes.user
  console.log(props)
  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Paper className={classes.paper} style={{boxShadow: '5px 5px #d0b400', borderColor: "grey"}}>
            <Typography variant="h6" component="h6" gutterBottom>
                {user.username}
            </Typography>
            {user.email}<br />
            {user.first_name}
            {user.last_name}
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper} style={{textAlign: 'left', boxShadow: '5px 5px #d0b400'}}>
            <Typography variant="h5" component="h5" gutterBottom>
                {props.attributes.title}
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom>
                {props.attributes.description}
              {/* <Link to={`/forum/${post.title}`}> */}
                <AwesomeButton type="primary" size="small" style={{fontSize: '24px', float: 'right'}} onPress={() => props.viewPost(props)}>View</AwesomeButton>
              {/* </Link> */}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}