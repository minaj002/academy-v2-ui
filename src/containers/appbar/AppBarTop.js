import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import DrawerLeft from '../drawer/DrawerLeft';
import RightMenu from './RightMenu';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {logoutUser} from '../../actions';

const appBarSettings = {
    showMenuIconButton: true,
    iconElementLeft: null,
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
                    onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
                    iconElementRight={isAuthenticated ? <RightMenu onLogoutClick={() => this.onLogoutClick()}
                    /> : null}
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