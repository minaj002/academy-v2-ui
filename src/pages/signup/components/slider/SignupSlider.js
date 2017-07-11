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
import EmailSlide from './EmailSlide';
import FirstNameSlide from './FirstNameSlide';
import LastNameSlide from './LastNameSlide';
import DOBSlide from './DOBSlide';
import PasswordSlide from './PasswordSlide';
import PasswordRepeatSlide from './PasswordRepeatSlide';
import PhoneNumberSlide from './PhoneNumberSlide';
import AddressSlide from './AddressSlide';
import CountrySlide from './CountrySlide';
import LegalSlide from './LegalSlide';
import GenderSlide from './GenderSlide';


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

        console.log(this.state.data);
    };

    onMenuItemTouchTap = (id) => {
        this.moveTo(id);
    };

    handleSubmit = (id, data) => {
        this.next(id+1, data);
    };

    next = (id, data) => {
        if (this.state.current<=id) {
            this.slider.slickNext();
            this.props.setTimeout(() => this.updateState(id, data), 500); //todo: use promise instead
        }
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
                            <Slider ref={c => this.slider = c }  {...sliderSettings}>

                                {/* Intro  */}

                                <div>
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
                                </div>

                                {/* Contact */}

                                <div>
                                    <div className="signup-block">
                                        <PhoneNumberSlide selectedCountry={this.state.data.country} onSubmit={(data) => this.handleSubmit(8, data)} />
                                    </div>
                                </div>
                                <div>
                                    <div className="signup-block">
                                        <AddressSlide country={this.state.data.country} onSubmit={(data) => this.handleSubmit(9, data)} />
                                    </div>
                                </div>

                                {/* Legal */}

                                <div>
                                    <div className="signup-block">
                                        <LegalSlide onSubmit={(data) => this.handleSubmit(10, data)} />
                                    </div>
                                </div>
                            </Slider>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

/*SignupSlider.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};*/


export default ReactTimeout(SignupSlider);

