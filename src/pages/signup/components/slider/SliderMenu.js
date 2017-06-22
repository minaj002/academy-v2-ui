/**
 * Created by artis on 21/06/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';


const menuItems = [
    [ // Introduction
        { id: 0, name: 'Email', props: {disabled: false}, active: true},
        { id: 1, name: 'First name', props: {disabled: true}, active: false},
        { id: 2, name: 'Last name', props: {disabled: true}, active: false},
        { id: 3, name: 'Birthday', props: {disabled: true}, active: false},
        { id: 4, name: 'Password', props: {disabled: true}, active: false},
        { id: 5, name: 'Phone number', props: {disabled: true}, active: false}

    ]
];

class SliderMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: menuItems
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current!==nextProps.current) {
            this.mapMenuItems(nextProps.current)
        }
    }

    onMenuItemTouchTap = (id) => {
        console.log(id);
        this.mapMenuItems(id);
        this.props.onMenuItemTouchTap(id);
    };

    mapMenuItems = (id) => {
        let menuItems = this.state.menuItems;
        menuItems.map((item) => {
            return item.map((inner) => {
                if (inner.id===id) {
                    inner.active = true;
                    inner.props.disabled = false;
                } else if (inner.id>id) {
                    inner.props.disabled = true;
                    inner.active = false;
                } else {
                    inner.active = false;
                }

                return inner;
            })
        });

        this.setState({
            menuItems: menuItems
        })
    };

    render() {

        const menu = this.state.menuItems[0].map((item) => {
            let className = (item.props.disabled ? 'disabled ' : '') + "menu-item";
            return <ListItem
                className={className}
                key={item.id}
                primaryText={item.name}
                onTouchTap={() => this.onMenuItemTouchTap(item.id)}
                leftIcon={item.active ? <ArrowForward /> : null}
                {...item.props}
            />
        });

        return (
            <List className="slider-menu">
                <Subheader>Where are you?</Subheader>
                <ListItem className="menu-item" primaryText="Introduction" initiallyOpen={true} autoGenerateNestedIndicator={false}
                          nestedItems={menu} disabled={true}
                />
            </List>
        )

    }

}

SliderMenu.propTypes = {
    onMenuItemTouchTap: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired
};

export default SliderMenu;
