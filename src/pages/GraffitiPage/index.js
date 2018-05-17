/* eslint react/require-default-props: 0 */

import React from 'react';
import {connect} from 'react-redux';
import cookie from "cookie";
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import {doGraffitiAction} from "../../actions";
import {parse} from "qs";
import ChartContainer from "../../component/graffitiCharts/ChartContainer";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


//import PropTypes from 'prop-types';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },


});


class GraffitiPage extends React.PureComponent {
    constructor(props) {
        super(props);

        const cookies = cookie.parse(document.cookie);
        const params = parse(props.location.search.slice(1));
        console.log('cookies :', cookies, " params :", params);
        this.props.doGraffitiAction(props.history, props.location, params, cookies)
    }

    render() {
        const {classes, graffiti, doGraffitiAction} = this.props || {};
        return <Grid container className={classes.root} spacing={8}>
            <Grid item xs={12} md={6} lg={4}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        }

                        title="Some Text"
                        subheader="-by, Ramesh"
                    />
                    <Divider/>
                    <ChartContainer graffiti={graffiti} chartAction={doGraffitiAction}/>
                    <CardContent>
                        <Typography component="p">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                        </Typography>
                        <Divider/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        }

                        title="Some Text"
                        subheader="-by, Ramesh"
                    />
                    <Divider/>
                    <ChartContainer graffiti={graffiti} chartAction={doGraffitiAction}/>
                    <CardContent>
                        <Typography component="p">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                        </Typography>
                        <Divider/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    }
};

const mapStateToProps = (state) => {
    const {graffiti} = state;
    return {
        graffiti
    }
};


export default connect(mapStateToProps, {doGraffitiAction})(withStyles(styles)(GraffitiPage));