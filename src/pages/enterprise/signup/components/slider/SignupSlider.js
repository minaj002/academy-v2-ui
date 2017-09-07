/**
 * Created by artis on 21/06/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import merge from 'lodash/merge';

import { Row, Col } from 'react-flexbox-grid';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import SliderMenu from './SliderMenu';
import EnterPriseNameSlide from './EnterPriseNameSlide';
import LegalStatusSlide from './LegalStatusSlide';
import CountrySlide from './CountrySlide';
import EnterpriseCountrySlide from './EnterpriseCountrySlide';
import RegistrationNumberSlide from './RegistrationNumberSlide';
import RegistrationDateSlide from './RegistrationDateSlide';
import BusinessAddressSlide from './BusinessAddressSlide';
import PositionSlide from './PositionSlide';
import FirstNameSlide from './FirstNameSlide';
import LastNameSlide from './LastNameSlide';
import EmailSlide from './EmailSlide';
import PhoneNumberSlide from './PhoneNumberSlide';
import TermsSlide from './TermsSlide';
import PasswordSlide from './PasswordSlide';
import PasswordRepeatSlide from './PasswordRepeatSlide';
import LanguageSlide from './LanguageSlide';

const slidesCount = 16;
const sliderSettings = {
    accessibility: false,
    infinite: false,
    dots: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    centerMode: false,
    slidesToShow: 1,
    adaptiveHeight: true,
    swipeToSlide: false,
    draggable: false,
    lazyLoad:true,
    cssEase: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
    responsive: [{
        breakpoint: 640, settings: {
            centerMode: false
        }}
    ]
};

const menuItems = [
    {id: 0, name: 'Enterprise', props: {disabled:false, open:true, checked: false}, sub: [
        {id: 0, name: 'Country', props: {disabled: false}, active: true},
        {id: 1, name: 'Enterprise name', props: {disabled: true}, active: false},
        {id: 2, name: 'Registration number', props: {disabled: true}, active: false},
        {id: 3, name: 'Legal status', props: {disabled: true}, active: false},
        {id: 4, name: 'Registration date', props: {disabled: true}, active: false},
        {id: 5, name: 'Address', props: {disabled: true}, active: false},
    ]},
    {id: 1, name: 'Personal', props: {disabled:true, open:false, checked: false}, sub: [
        {id: 6, name: 'First name', props: {disabled: true}, active: false},
        {id: 7, name: 'Last name', props: {disabled: true}, active: false},
        {id: 8, name: 'Email', props: {disabled: true}, active: false},
        {id: 9, name: 'Country', props: {disabled: true}, active: false},
        {id: 10, name: 'Language', props: {disabled: true}, active: false},
        {id: 11, name: 'Phone number', props: {disabled: true}, active: false},
        {id: 12, name: 'Position', props: {disabled: true}, active: false},
        {id: 13, name: 'Password', props: {disabled: true}, active: false},
        {id: 14, name: 'Password repeat', props: {disabled: true}, active: false},
        {id: 15, name: 'Terms', props: {disabled: true}, active: false}
    ]}
];

class SignupSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            data: {ownerCountry: '', address: {}, password: ''}
        }
    }

    updateState = (id, data) => {
        this.setState({
            current: id,
            data: merge(this.state.data, data)
        });

        console.log("data", this.state.data);
    };

    onMenuItemTouchTap = (id) => {
        this.moveTo(id);
    };

    collectData = (id, data) => {
        const next = id+1;
        if (this.state.current<=next && next<slidesCount) {
            this.next(next, data);
        }
    };

    next = (id, data) => {
        this.slider.slickNext();
        this.props.setTimeout(() => this.updateState(id, data), 500); //todo: use promise instead
    };

    moveTo = (id) => {
        this.slider.slickGoTo(id);
        this.props.setTimeout(() => this.updateState(id), 500); //todo: use promise instead
    };

    render() {

        const slides = [
            /* Enterprise */
            <EnterpriseCountrySlide onSubmit={(data) => this.collectData(0, data)}/>,
            <EnterPriseNameSlide onSubmit={(data) => this.collectData(1, data)} />,
            <RegistrationNumberSlide onSubmit={(data) => this.collectData(2, data)} />,
            <LegalStatusSlide onSubmit={(data) => this.collectData(3, data)} />,
            <RegistrationDateSlide onSubmit={(data) => this.collectData(4, data)} />,
            <BusinessAddressSlide country={this.state.data.address.country} onSubmit={(data) => this.collectData(5, data)} />,
            /* Personal */
            <FirstNameSlide onSubmit={(data) => this.collectData(6, data)}/>,
            <LastNameSlide onSubmit={(data) => this.collectData(7, data)}/>,
            <EmailSlide onSubmit={(data) => this.collectData(8, data)} />,
            <CountrySlide handleSubmit={(data) => this.collectData(9, data)}/>,
            <LanguageSlide onSubmit={(data) => this.collectData(10, data)} />,
            <PhoneNumberSlide selectedCountry={this.state.data.ownerCountry} onSubmit={(data) => this.collectData(11, data)} />,
            <PositionSlide onSubmit={(data) => this.collectData(12, data)} />,
            <PasswordSlide onSubmit={(data) => this.collectData(13, data)}/>,
            <PasswordRepeatSlide password={this.state.data.password} onSubmit={(data) => this.collectData(14, data)}/>,
            <TermsSlide data={this.state.data} history={this.props.history} />
        ];

        return (
            <Row>
                <Col xs sm={4} md={3} lg={3} className="hide-mobile menu">
                    <SliderMenu menuItems={menuItems} current={this.state.current} onMenuItemTouchTap={this.onMenuItemTouchTap} />
                </Col>
                <Col xs sm={8} md={6} lg={6}>
                    <Row className="slider-wrapper">
                        <Col lg={12}>
                            <Slider ref={c => this.slider = c } {...sliderSettings}>
                                {
                                    slides.map((slide, i) =>
                                        <div key={i}>
                                            <div className="signup-block">
                                                {slide}
                                            </div>
                                        </div>
                                    )
                                }
                            </Slider>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

SignupSlider.propTypes = {
    history: PropTypes.object.isRequired,
};

export default ReactTimeout(SignupSlider);

