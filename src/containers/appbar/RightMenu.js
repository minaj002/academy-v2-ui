/**
 * Created by artis on 07/04/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {white} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {sendStudents} from "../../actions/checkin";

class RightMenu extends Component {

    constructor(props) {
        super(props);
    }

    sendStudentsOnTap = () => {
        this.props.dispatch(sendStudents());
    }

    render() {

        const {onLogoutClick, props} = this.props;

        return (
            <IconMenu
                {...props}
                iconButtonElement={
                    <IconButton><MoreVertIcon color={white}/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}>

                <MenuItem primaryText="Sign out" onTouchTap={() => onLogoutClick()} />
                <MenuItem primaryText="Send students" onTouchTap={this.sendStudentsOnTap} />

            </IconMenu>
        );
    };
}

RightMenu.propTypes = {
    onLogoutClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    title: state.title.text
});

export default connect(mapStateToProps) (RightMenu);

