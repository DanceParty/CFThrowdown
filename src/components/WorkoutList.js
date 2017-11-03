import React from 'react'
import { Text, View } from 'react-native'

// apollo
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// components
import Workout from './Workout'

class WorkoutList extends React.Component {

  render() {
    if (this.props.allWorkoutsQuery.loading) {
      return <Text>Loading Workouts...</Text>
    }
    if (this.props.allWorkoutsQuery.error) {
      return <Text>Error: {this.props.allWorkoutsQuery.error.message}</Text>
    }
    const workoutsToRender = this.props.allWorkoutsQuery.allWorkouts
    return (
      <View>
        {
          workoutsToRender.map(workout => (
            <Workout key={workout.id} workout={workout} />
          ))
        }
      </View>
    )
  }
}

const ALL_WORKOUTS_QUERY = gql`
  query AllWorkoutsQuery {
    allWorkouts {
      id
      name
      steps
    }
  }
`

export default graphql(ALL_WORKOUTS_QUERY, { 
  name: 'allWorkoutsQuery',
  options: {
    errorPolicy: 'all',
  },
})(WorkoutList)