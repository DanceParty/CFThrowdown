import React from 'react'
import { View } from 'react-native'

// components
import Signup from '../components/Signup'

const SignUp = (props) => (
  <View>
    <Signup navigation={props.navigation} />
  </View>
)

export default SignUp