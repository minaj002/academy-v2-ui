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
import PhoneNumberSlide from './PhoneNumberSlide';

const sliderSettings = {
    infinite: false,
    dots: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    centerMode: true,
    slidesToShow: 1,
    adaptiveHeight: true,
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
            current: 0
        };
    }

    updateState = (id) => {
        this.setState({
            current: id
        });
    };

    onMenuItemTouchTap = (id) => {
        this.moveTo(id);
    };

    handleSubmit = (id, data) => {
        this.next(id+1);
    };

    next = (id) => {
        if (this.state.current<=id) {
            this.slider.slickNext();
            this.props.setTimeout(() => this.updateState(id), 500); //todo: use promise instead
        }
    };

    moveTo = (id) => {
        console.log(this.state.current, id);
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
                                <div className="signup-block">
                                    <EmailSlide onSubmit={(data) => this.handleSubmit(0, data)} />
                                </div>
                                <div className="signup-block">
                                    <FirstNameSlide onSubmit={(data) => this.handleSubmit(1, data)}/>
                                </div>
                                <div className="signup-block">
                                    <LastNameSlide onSubmit={(data) => this.handleSubmit(2, data)}/>
                                </div>
                                <div className="signup-block">
                                    <DOBSlide onSubmit={(data) => this.handleSubmit(3, data)}/>
                                </div>
                                <div className="signup-block">
                                    <PasswordSlide onSubmit={(data) => this.handleSubmit(4, data)}/>
                                </div>
                                <div className="signup-block">
                                    <PhoneNumberSlide onSubmit={(data) => this.handleSubmit(5, data)} />
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

