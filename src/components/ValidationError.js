/**
 * Created by artis on 31/03/2017.
 */

import React from 'react';

const ValidationError = (props) => (
    <div className="form-control-feedback">{props.children}</div>
);

export default ValidationError;
