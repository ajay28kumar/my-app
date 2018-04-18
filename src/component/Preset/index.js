import React from 'react';
import {connect} from 'react-redux';
import {doModalAction, doPresetAction} from '../../action'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Preset extends React.Component {
  selectSong = (event, index, value) => {
    this.props.doPresetAction('Preset', 'changePreset', value);
  };
  
  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Preset"
          value={this.props.preset.selectedSong}
          onChange={this.selectSong}
        >
          {this.props.preset.songList.map(songType => <MenuItem
            key={`songlist-${songType.value}`} value={songType.value} primaryText={songType.text}/>)}
        
        </SelectField>
        
        <RaisedButton
          label={`Set Equilizer for ${this.props.preset.selectedSong}`}
          disabled={!this.props.preset.selectedSong}
          onClick={() => this.props.doModalAction('Preset', 'openModal', this.props.preset.selectedSong)}/>
      </div>
    );
  }
}


const selector = ({preset}) => {
  return {preset};
};

export default connect(selector, {doPresetAction, doModalAction})(Preset)


