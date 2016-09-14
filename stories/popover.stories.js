import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Popover from '../components/popover';
import Button from '../components/Button';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class PopoverExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, anchorElement: null };
  }
  render() {
    return (
      <div>
        <Button
          onClick={(event) => {
            this.setState({
              show: !this.state.show,
              anchorElement: event.currentTarget,
            })
          }}
        >
          Click
        </Button>
        <Popover
          show={this.state.show}
          anchorElement={this.state.anchorElement}
          onClickOutside={() => {
            this.setState({
              show: false,
            });
          }}
        >
          <div style={{paddingLeft: '16px'}}>item1</div>
          <div style={{paddingLeft: '16px'}}>item2</div>
          <div style={{paddingLeft: '16px'}}>item3</div>
          <div style={{paddingLeft: '16px'}}>item4</div>
          <div style={{paddingLeft: '16px'}}>item5</div>
          <div style={{paddingLeft: '16px'}}>item6</div>
        </Popover>
      </div>
    )
  }
}

class PopoverExample2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, anchorElement: null };
  }
  render() {
    return (
      <div>
        <Button
          onClick={(event) => {
            this.setState({
              show: !this.state.show,
              anchorElement: event.currentTarget,
            })
          }}
        >
          Click
        </Button>
        <Popover
          show={this.state.show}
          anchorElement={this.state.anchorElement}
          anchorOrign={['left', 'top']}
          targetOrign={['left', 'top']}
          onClickOutside={() => {
            this.setState({
              show: false,
            });
          }}
        >
          <div style={{paddingLeft: '16px'}}>item1</div>
          <div style={{paddingLeft: '16px'}}>item2</div>
          <div style={{paddingLeft: '16px'}}>item3</div>
          <div style={{paddingLeft: '16px'}}>item4</div>
          <div style={{paddingLeft: '16px'}}>item5</div>
          <div style={{paddingLeft: '16px'}}>item6</div>
        </Popover>
      </div>
    )
  }
}

storiesOf('Popover 气泡', module)
  .add('Basic 基本', () => {
    return (
      <div>
        <PopoverExample1 />
        <PopoverExample2 />
      </div>
    );
  })
