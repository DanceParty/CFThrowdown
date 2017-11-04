import React from 'react'
import { Text, ScrollView, View } from 'react-native'

// apollo
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// presentation components
import ProfileCard from './ProfileCard'

class ProfileContainer extends React.Component {

  render() {
    if (this.props.currentUserQuery && this.props.currentUserQuery.loading) {
      return <Text>Loading User...</Text>
    }
    if (this.props.currentUserQuery && this.props.currentUserQuery.error) {
      return <Text>Error Querying User: {this.props.currentUserQuery.error.message}</Text>
    }

    const user = this.props.currentUserQuery.User

    return (
      <View style={styles.container}>
        <ProfileCard 
          user={user} 
          navigation={this.props.navigation}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery($userId: ID) {
    User(id: $screenProps) {
      id
      email
      firstName
      lastName
      division
      role
    }
  }
`

const ProfileContainerWithData = graphql(CURRENT_USER_QUERY, {
  name: 'currentUserQuery',
  options: ({ userId }) => ({ variables: { userId } }),
})(ProfileContainer)

export default ProfileContainerWithData