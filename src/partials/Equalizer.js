/* eslint react/require-default-props: 0 */
import React from 'react';
import Slider from 'material-ui/Slider';

const Equalizer = (props) => {
  console.log('props : ', props.data);
  return (<div style={{display: 'inline-flex'}}>
    {props.data.map(val => <Slider style={{height: '130px', width: '24px'}} axis="y" defaultValue={0.5}/>)}
  </div>)
};


export default Equalizer;