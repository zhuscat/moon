import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Card from '../components/card';
import '../style/base.scss'

storiesOf('Card 卡片', module)
  .add('Basic 基本', () => {
    return (
      <Card />
    );
  })
