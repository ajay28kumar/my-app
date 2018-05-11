/* eslint react/require-default-props: 0 */

import React from 'react';
import {connect} from 'react-redux';
import cookie from "cookie";
import {withStyles} from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import {doGraffitiAction} from "../../actions";
import {parse} from "qs";
import ChartContainer from "../../component/graffitiCharts/ChartContainer";

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
            <Grid item xs={12} sm={6}>

                <ChartContainer graffiti={graffiti} chartAction={doGraffitiAction}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <ChartContainer graffiti={graffiti} chartAction={doGraffitiAction}/>
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