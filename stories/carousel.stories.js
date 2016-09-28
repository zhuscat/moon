import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Carousel from '../components/carousel';
import '../style/base.scss';

storiesOf('Carousel 轮播器', module)
  .add('Basic 基本', () => {
    return (
      <Carousel>
        <img
          className="zc-carousel-img"
          src="http://s.dgtle.com/portal/201609/26/162751buu8ruri9r269iny.png?szhdl=imageview/2/w/930"
          alt="first"
        />
        <img
          className="zc-carousel-img"
          src="http://s.dgtle.com/portal/201609/23/171010h0dpp8ud5ij81i44.png?szhdl=imageview/2/w/930"
          alt="second"
        />
        <img
          className="zc-carousel-img"
          src="http://s.dgtle.com/portal/201609/14/131026z0wy7wsiw6w0hk22.jpg?szhdl=imageview/2/w/930"
          alt="third"
        />
      </Carousel>
    );
  })
