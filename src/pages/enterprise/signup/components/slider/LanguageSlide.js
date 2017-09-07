/**
 * Created by artis on 07/09/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

class LanguageSlide extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { pristine, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What language is better for you?</div>

                <div className="signup-field-group">
                    <Field name="language" component={SelectField} floatingLabelText="Language">
                        <MenuItem value="EN" primaryText="English" />
                        <MenuItem value="LV" primaryText="Latviešu" />
                        <MenuItem value="RU" primaryText="Russian" />
                    </Field>
                </div>
                <div>
                    <RaisedButton type="submit" className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>
        );
    }
}

LanguageSlide = reduxForm({
    form: 'LanguageSlide'
})(LanguageSlide);

export default connect() (LanguageSlide);



