import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Constants } from 'expo'

// components
import WorkoutList from '../components/WorkoutList'

class Workouts extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.statusBar} />
        <WorkoutList />
      </View>     
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: (Platform.OS === 'ios') ? Constants.statusBarHeight : 0,
  },
})

export default Workouts