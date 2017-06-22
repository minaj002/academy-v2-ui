/**
 * Created by artis on 19/05/2017.
 */

import React, {Component} from 'react';
import {TextField, IconButton} from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search';
import PropTypes from 'prop-types';

const baseStyles = {
    open: {
        width: 200,
    },
    closed: {
        width: 0,
    },
    smallIcon: {
        width: 30,
        height: 30
    },
    icon: {
        width: 40,
        height: 40,
        padding: 5,
        top: 10
    }
};

const animationStyle = {
    transition: 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)'
};


class SimpleSearchField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            value: ""
        };
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.onSearch(this.state.value);
        }
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    };

    onClick = () => {
        this.setState({isOpen: !this.state.isOpen});
        this.refs.search.focus();
    };

    onBlur = () => {
        this.setState({isOpen: false });
        this.refs.search.blur();
    };

    render() {

        let textStyle = this.state.isOpen ? baseStyles.open : baseStyles.closed;
        textStyle = Object.assign(textStyle, animationStyle);

        const divStyle = Object.assign({}, textStyle, baseStyles.frame, animationStyle);
        divStyle.width += baseStyles.icon.width + 5;

        return (
            <div style={divStyle}>
                <IconButton iconStyle={baseStyles.smallIcon} style={baseStyles.icon} onClick={() => this.onClick()}>
                    <SearchIcon />
                </IconButton>
                <TextField name="search" value={this.state.value} ref="search"
                           style={textStyle} onBlur={() => this.onBlur()}
                           onChange={this.onChange}
                           onKeyPress={this.onKeyPress}
                />
            </div>
        );
    }

}

SimpleSearchField.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default SimpleSearchField;