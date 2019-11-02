import React, {PureComponent} from 'react';
import {Image, Dimensions, ActivityIndicator} from 'react-native';
import {Image as ElImage} from 'react-native-elements';

const {width, height} = Dimensions.get('window');
export default class EImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      width: width,
      height: width,
    };
    Image.getSize(this.props.source.uri, (Ewidth, Eheight) => {
      this.setState({
        loading: true,
        width: width,
        height: (Eheight / Ewidth) * width,
      });
    });
  }

  render() {
    return (
      <ElImage
        style={{width: this.state.width, height: this.state.height}}
        PlaceholderContent={<ActivityIndicator size="large" color="#fff" />}
        {...this.props}
      />
    );
  }
}
