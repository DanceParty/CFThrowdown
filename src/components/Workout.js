import React from 'react'
import { Text, View } from 'react-native'

class Workout extends React.Component {

  render() {
    return (

      <View>
        <Text>{this.props.workout.name}</Text>
      </View>

    )
  }

}

export default Workout