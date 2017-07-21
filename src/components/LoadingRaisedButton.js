/**
 * Created by artis on 21/07/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';


const LoadingFetchingButton = ({isFetching, ...rest}) => {
    return <RaisedButton icon={isFetching ? <CircularProgress size={24} /> : null} {...rest} />
};

LoadingFetchingButton.propTypes = {
    isFetching: PropTypes.bool.isRequired
};

export default LoadingFetchingButton;


