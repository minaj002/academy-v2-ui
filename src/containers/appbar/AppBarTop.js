/**
 * Created by artis on 06/04/2017.
 */

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import DrawerLeft from '../drawer/DrawerLeft';
import RightMenu from './RightMenu';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUser } from '../../actions';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const appBarSettings = {
    showMenuIconButton: false,
    iconElementLeft: null,
    onLeftIconButtonTouchTap: null
};

class AppBarTop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    toggleDrawer() {
        this.setState({
            open: !this.state.open
        });
    }

    onLogoutClick() {
        this.props.dispatch(logoutUser());
        this.props.history.push('/login');
    }

    render() {

        const {isAuthenticated, title} = this.props;

        return (
            <div>
                <AppBar
                    title={title}
                    iconElementRight={isAuthenticated ? <RightMenu onLogoutClick={() => this.onLogoutClick()}  /> : null}
                    {...appBarSettings}
                />

                <DrawerLeft open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)}
                            docked={false} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.title.text
});

export default connect(mapStateToProps) (withRouter(AppBarTop));