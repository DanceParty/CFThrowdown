import React from 'react'
import { BackHandler, View } from 'react-native'

// components
import Signup from '../components/Signup'

class SignUp extends React.Component {
  componentDidMount() {
    // disables the back button for all pages (not working when on App.js though???)
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }

  componentWillUnmount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return false
    });
  }


  render() {
    return (
      <View>
        <Signup navigation={this.props.navigation} />
      </View>
    )
  }
}

export default SignUp