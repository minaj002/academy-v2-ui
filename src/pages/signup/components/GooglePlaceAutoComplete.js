/**
 * Created by artis on 28/06/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

// google places api
// AIzaSyCh1nOQVYwuS5Yf0ffClqRIZGV6UjIbL9w

const dtConfig = {
    text: 'description',
    value: 'description'
};

class GooglePlaceAutoComplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this._autoCompleteService = new google.maps.places.AutocompleteService();
        this._geocoder = new google.maps.Geocoder();
    }

    populateData(predictions) {
        this.setState({
            data: predictions,
        })
    }

    onUpdateInput = (val) => {
        let instance = this;
        if (val.length>0) {
            this._autoCompleteService.getPlacePredictions({input: val, types: ['geocode']}, function (predictions) {
                if (predictions) {
                    instance.populateData(predictions);
                }
            });
        }
    };

    onNewRequest = (item) => {
        let instance = this;
        this._geocoder.geocode({placeId: item.place_id}, function (results, status) {
            if (results) {
                let addressComp = results[0].address_components;
                let city;
                let postalCode;

                for (let i=0; i<addressComp.length; i++) {
                    if (addressComp[i].types.indexOf("postal_code")!==-1) {
                        postalCode = addressComp[i].long_name;
                    }
                    if (addressComp[i].types.indexOf("locality")!==-1) {
                        city = addressComp[i].long_name;
                    }
                }

                instance.props.onItemSelected({city: city, postalCode: postalCode});
            }
        });
    };

    render() {

        const {input, meta: {touched, error}, onItemSelected,  ...custom} = this.props;

        return (
            <AutoComplete
                errorText={touched && error}
                onNewRequest={(selectedItem) => {
                    console.log(selectedItem);
                    input.onChange(selectedItem.description);
                    this.onNewRequest(selectedItem);
                }}

                onUpdateInput={(selectedItem) => {
                    input.onChange(selectedItem);
                    this.onUpdateInput(selectedItem);
                }}

                dataSource={this.state.data}
                dataSourceConfig={dtConfig}

                fullWidth={true}
                filter={AutoComplete.noFilter}
                searchText={input.value}
                {...custom}
            />
        );
    }

}

GooglePlaceAutoComplete.PropTypes = {
    onItemSelected: PropTypes.func.isRequired
};

export default GooglePlaceAutoComplete;
