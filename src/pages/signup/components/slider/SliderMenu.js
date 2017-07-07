/**
 * Created by artis on 21/06/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';
//cyan500 color for checked icon


const menuItems = [
    {id: 0, name: 'Introduction', props: {disabled:false, open:true, checked: false}, sub: [
        {id: 0, name: 'Phone number', props: {disabled: true}, active: false},
        {id: 1, name: 'Email', props: {disabled: false}, active: true},
        {id: 2, name: 'Country', props: {disabled: true}, active: false},
        {id: 3, name: 'First name', props: {disabled: true}, active: false},
        {id: 4, name: 'Last name', props: {disabled: true}, active: false},
        {id: 5, name: 'Gender', props: {disabled: true}, active: false},
        {id: 6, name: 'Birthday', props: {disabled: true}, active: false},
        {id: 7, name: 'Password', props: {disabled: true}, active: false},
        {id: 8, name: 'Password confirm', props: {disabled: true}, active: false}
    ]},
    {id: 1, name: 'Contact', props: {disabled:true, open:false, checked: false}, sub: [

        {id: 9, name: 'Address', props: {disabled: true}, active: false}
    ]},
    {id: 2, name: 'Legal', props: {disabled:true, open:false, checked: false}, sub:[
        {id: 10, name: 'Terms and Conditions', props: {disabled: false}, active: true}
    ]}
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
        this.mapMenuItems(id);
        this.props.onMenuItemTouchTap(id);
    };

    onTopLevelMenuTouchTap = (id) => {
        let menuItems = this.state.menuItems;
        menuItems.map((item) => {
            if (item.id===id) {
                item.props.open = true;
                if (item.sub) {
                    item.sub = item.sub.map((sub, i) => {
                        if (i===0) {
                            this.props.onMenuItemTouchTap(sub.id);
                        }

                        return sub;
                    });
                }
            } else {
                item.props.open = false;
            }
        });

        this.setState({
            menuItems: menuItems
        });
    };

    mapMenuItems = (id) => {
        let menuItems = this.state.menuItems;
        let prevIndex = null;
        menuItems.map((item, i) => {
            if (item.sub) {
                item.sub = item.sub.map((sub) => {
                    if (sub.id===id) {
                        sub.active = true;
                        sub.props.disabled = false;
                        item.props.open = true;
                        item.props.disabled = false;
                        prevIndex = i>0 ? i-1 : null;
                    } else if (sub.id>id) {
                        //sub.props.disabled = true;
                        sub.active = false;
                    } else {
                        sub.active = false;
                    }

                    return sub;
                });
            }
        });

        if (prevIndex!==null) {
            menuItems[prevIndex].props.open = false;
            menuItems[prevIndex].props.checked = true;
        }

        this.setState({
            menuItems: menuItems
        })
    };

    render() {

        const menu = this.state.menuItems.map((item) => {
            let sub = [];
            if (item.sub) {
                 sub = item.sub.map((subItem) => {
                    let className = (subItem.props.disabled ? 'disabled' : (subItem.active ? 'menu-item-active' : '')) + " menu-item";
                    let innerStyle = {
                        paddingTop: '10px',
                        paddingBottom:'10px',
                        paddingRight:'10px',
                        paddingLeft: subItem.active ? '52px' : '16px'
                    };

                    return <ListItem
                        className={className}
                        key={subItem.id}
                        primaryText={subItem.name}
                        onTouchTap={() => this.onMenuItemTouchTap(subItem.id)}
                        leftIcon={subItem.active ? <ArrowForward style={{margin: '6px'}} /> : null}
                        innerDivStyle={innerStyle}
                        {...subItem.props}
                    />
                });
            }

            return <ListItem key={item.id} className="menu-item" primaryText={item.name} open={item.props.open}
                             autoGenerateNestedIndicator={false} onTouchTap={() => this.onTopLevelMenuTouchTap(item.id)}
                             nestedItems={sub} disabled={item.props.disabled} leftIcon={item.props.checked ? <CheckIcon/> : null}
            />
        });

        return (
            <List className="slider-menu">
                {/*<Subheader>Where are you?</Subheader>*/}
                {menu}
            </List>
        )

    }

}

SliderMenu.propTypes = {
    onMenuItemTouchTap: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired
};

export default SliderMenu;
