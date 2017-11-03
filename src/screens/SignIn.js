import React from "react";
import { View } from "react-native";

// components
import Login from '../components/Login'

class SignIn extends React.Component {
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Login navigation={this.props.navigation} />
      </View>
    )
  }
}

export default SignIn