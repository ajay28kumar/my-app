/* eslint react/require-default-props: 0 */
import React from 'react';

import Charts from "../Charts";


class ChartContainer extends React.PureComponent {


    render() {
        const {graffiti} = this.props || {};
        return <Charts graffiti={graffiti}/>

    }
};


export default ChartContainer;