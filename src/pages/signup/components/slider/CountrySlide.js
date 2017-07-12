/**
 * Created by artis on 27/06/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
//import CountryAutoComplete from '../CountryAutoComplete';
import AutoComplete from 'material-ui/AutoComplete';
import countries from '../../../../data/countries.json';


/*const CountriesAutoComplete = ({input, ...custom}) => {
    return <AutoComplete
        fullWidth={true}
        searchText={input.value}
        {...custom}
    />;
};*/

class CountrySlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            set: false,
            data: { country: null }
        }
    }

    onNewRequest = (country) => {
        this.setState({
            set: true,
            data: { country: country.alpha2Code }
        });
    };

    onChange = () => {
        this.setState({
            set: false
        });
    };

    render() {

        const { handleSubmit } = this.props;

        return (
            <div>

                <div className="mdc-typography--headline">Which country do you live?</div>

                <div className="signup-field-group">
                    <AutoComplete name="country" hintText="e.g. Germany"
                                  maxSearchResults={5}
                                  onUpdateInput={this.onChange}
                                  onNewRequest={this.onNewRequest}
                                  dataSourceConfig={{text: 'name', value: 'alpha2Code'}}
                                  dataSource={countries}
                                  tabIndex="-1"
                                  fullWidth />
                </div>
                <div>
                    <RaisedButton className="continue-button"
                                  disabled={!this.state.set}
                                  onTouchTap={() => handleSubmit(this.state.data)}
                                  primary label="Continue" />
                </div>

            </div>
        );
    }
}

/*CountrySlide = reduxForm({
    form: 'CountrySlide'
})(CountrySlide);*/

export default connect() (CountrySlide);


