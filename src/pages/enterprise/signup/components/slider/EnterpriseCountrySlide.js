/**
 * Created by artis on 27/06/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import countries from '../../../../../data/countries.json';

class EnterpriseCountrySlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            set: false,
            data: {address: {
                country: null
            }}
        }
    }

    onNewRequest = (country) => {
        this.setState({
            set: true,
            data: { address: { country: country.alpha2Code }}
        });
    };

    onChange = () => {
        this.setState({
            set: false
        });
    };

    render() {

        const { onSubmit } = this.props;

        return (
            <div>

                <div className="mdc-typography--headline">Which country is your company registered?</div>

                <div className="signup-field-group">
                    <AutoComplete name="address.country" hintText="e.g. Germany"
                                  maxSearchResults={5}
                                  onUpdateInput={this.onChange}
                                  onNewRequest={this.onNewRequest}
                                  dataSourceConfig={{text: 'name', value: 'alpha2Code'}}
                                  filter={AutoComplete.caseInsensitiveFilter}
                                  dataSource={countries}
                                  tabIndex="-1"
                                  fullWidth />
                </div>
                <div>
                    <RaisedButton className="continue-button"
                                  disabled={!this.state.set}
                                  onTouchTap={() => onSubmit(this.state.data)}
                                  primary label="Continue" />
                </div>

            </div>
        );
    }
}

/*CountrySlide = reduxForm({
    form: 'CountrySlide'
})(CountrySlide);*/

export default connect() (EnterpriseCountrySlide);


