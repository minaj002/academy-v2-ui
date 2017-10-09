/**
 * Created by artis on 06/04/2017.
 */

import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PaymentIcon from 'material-ui/svg-icons/action/payment';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import InputIcon from 'material-ui/svg-icons/action/input';
import { NavLink } from 'react-router-dom';

const style = {
    card: {
        fontSize: '24px',
        color: '#FFFFFF',
        lineHeight: '64px',
        fontWeight: '300',
        backgroundColor: 'rgb(0, 188, 212)',
        paddingLeft: '24px',
        marginBottom: '8px'
    }
};

class DrawerLeft extends Component {

    render() {

        return (
            <Drawer {...this.props} onRequestChange={this.props.onToggleDrawer}>
                <div style={style.card}>
                    Weststein CRM
                </div>

                <MenuItem onTouchTap={this.props.onToggleDrawer}
                          containerElement={<NavLink to="/check-in" /> }
                          primaryText="Check in" leftIcon={<PeopleIcon />} />
                <MenuItem onTouchTap={this.props.onToggleDrawer}
                          containerElement={<NavLink to="/add-member" /> }
                          primaryText="Add Member" leftIcon={<InputIcon />} />
            </Drawer>
        );
    }

}

export default DrawerLeft;
