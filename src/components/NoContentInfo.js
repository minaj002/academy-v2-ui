/**
 * Created by artis on 28/04/2017.
 */

import React from 'react';
import NoDataIcon from 'material-ui/svg-icons/action/report-problem';

const NoContentInfo = (props) => {

    return (
        <div>
            <p className="no-content-info"><NoDataIcon/> No data available</p>
        </div>
    )
};

export default NoContentInfo;
