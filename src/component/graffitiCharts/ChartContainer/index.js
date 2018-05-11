/* eslint react/require-default-props: 0 */
import React from 'react';
import Grid from 'material-ui/Grid';

import Charts from "../Charts";


class ChartContainer extends React.PureComponent {


    render() {
        const {graffiti} = this.props || {};
        return (<div id={'charts'}>
            <Grid item xs={12} sm={4}>
                <Charts graffiti={graffiti}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Charts graffiti={graffiti}/>
            </Grid>
        </div>)
    }
};


export default ChartContainer;