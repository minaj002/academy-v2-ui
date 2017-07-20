/**
 * Created by artis on 21/06/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';

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
import LegalSlide from './LegalSlide';

/*

import DOBSlide from './DOBSlide';
import PasswordSlide from './PasswordSlide';
import PasswordRepeatSlide from './PasswordRepeatSlide';
import PhoneNumberSlide from './PhoneNumberSlide';
import AddressSlide from './AddressSlide';

import GenderSlide from './GenderSlide';*/

const slidesCount = 13;
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

class SignupSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            data: {country: '', password: ''}
        }
    }

    updateState = (id, data) => {
        this.setState({
            current: id,
            data: Object.assign(this.state.data, data)
        });
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

        return (
            <Row>
                <Col xs sm={4} md={3} lg={3} className="hide-mobile menu">
                    <SliderMenu current={this.state.current} onMenuItemTouchTap={this.onMenuItemTouchTap} />
                </Col>
                <Col xs sm={8} md={6} lg={6}>
                    <Row className="slider-wrapper">
                        <Col lg={12}>
                            <Slider ref={c => this.slider = c } {...sliderSettings}>

                                {/* Enterprise  */}

                                <div>
                                    <div className="signup-block">
                                        <EnterpriseCountrySlide handleSubmit={(data) => this.collectData(0, data)}/>
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <EnterPriseNameSlide onSubmit={(data) => this.collectData(1, data)} />
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <RegistrationNumberSlide onSubmit={(data) => this.collectData(2, data)} />
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <LegalStatusSlide onSubmit={(data) => this.collectData(3, data)} />
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <RegistrationDateSlide onSubmit={(data) => this.collectData(4, data)} />
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <BusinessAddressSlide country={this.state.data.country} onSubmit={(data) => this.collectData(5, data)} />
                                    </div>
                                </div>

                                {/* Personal */}

                                <div>
                                    <div className="signup-block">
                                        <FirstNameSlide onSubmit={(data) => this.collectData(6, data)}/>
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <LastNameSlide onSubmit={(data) => this.collectData(7, data)}/>
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <EmailSlide onSubmit={(data) => this.collectData(8, data)} />
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <CountrySlide handleSubmit={(data) => this.collectData(9, data)}/>
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <PhoneNumberSlide selectedCountry={this.state.data.country} onSubmit={(data) => this.collectData(10, data)} />
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <PositionSlide onSubmit={(data) => this.collectData(11, data)} />
                                    </div>
                                </div>

                                <div>
                                    <div className="signup-block">
                                        <LegalSlide data={this.state.data} history={this.props.history} />
                                    </div>
                                </div>

                                {/*<div>
                                    <div className="signup-block">
                                            <EmailSlide onSubmit={(data) => this.handleSubmit(0, data)} />
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                            <CountrySlide handleSubmit={(data) => this.handleSubmit(1, data)}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                        <FirstNameSlide onSubmit={(data) => this.handleSubmit(2, data)}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                        <LastNameSlide onSubmit={(data) => this.handleSubmit(3, data)}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                        <GenderSlide onSubmit={(data) => this.handleSubmit(4, data)}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                        <DOBSlide onSubmit={(data) => this.handleSubmit(5, data)}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                        <PasswordSlide onSubmit={(data) => this.handleSubmit(6, data)}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                        <PasswordRepeatSlide password={this.state.data.password} onSubmit={(data) => this.handleSubmit(7, data)}/>
                                    </div>
                                </div>*/}

                                {/* Contact */}

                                {/*<div>
                                    <div className="signup-block">
                                        <PhoneNumberSlide selectedCountry={this.state.data.country} onSubmit={(data) => this.handleSubmit(8, data)} />
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                        <AddressSlide country={this.state.data.country} onSubmit={(data) => this.handleSubmit(9, data)} />
                                    </div>
                                </div>*/}

                                {/* Legal */}

                                {/*<div>
                                    <div className="signup-block">
                                        <LegalSlide data={this.props.data} />
                                    </div>
                                </div>*/}
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

