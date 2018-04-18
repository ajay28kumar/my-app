/* eslint react/require-default-props: 0 */
import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Equalizer from './Equalizer'

import {doModalAction,} from '../action';

class LayerPartial extends React.Component {
  closeModal = () => this.props.doModalAction('modal', 'closeModal');
  
  modalAction = (...args) => {
    console.log('modalAction : ', args);
  };
  
  render() {
    return (
      <div>
        <Dialog
          title={this.props.selectedSong}
          modal={false}
          open={this.props.modalStatus}
          onRequestClose={this.closeModal}>
          <Equalizer
            data={this.props.data}
            modalClose={this.closeModal}
            modalAction={this.modalAction}
          />
        
        </Dialog>
      </div>
    )
  }
}


const selector = (state) => {
  const {modal, preset, equalizer} = state || {};
  const {selectedSong} = preset || {};
  const {modalStatus} = modal || {};
  return {
    modalStatus,
    selectedSong,
    data: equalizer[selectedSong]
  };
};


export default connect(selector, {
  doModalAction
})(LayerPartial)
