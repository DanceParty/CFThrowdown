import React from 'react'
import { Text, ScrollView, StyleSheet, View } from 'react-native'

// other imports
import { NavigationActions } from 'react-navigation'

// apollo
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

// auth
import { onSignOut } from '../../utils/auth'

// presentation components
import ProfileCard from './ProfileCard'



class ProfileContainer extends React.Component {

  state = {
    editMode: false,
    division: this.props.currentUserQuery.User ? this.props.currentUserQuery.User.division : '',
  }

  handleLogOut = () => {
    onSignOut()
      .then(this.props.navigation.navigate("SignedOutNav"))
      .catch(err => console.log('ProfileContainer: handleLogOut()', err))
  }

  handlePickerChange = (pickerValue) => {
    console.log(pickerValue)
    this.setState(() => ({
      division: pickerValue,
      editMode: false,
    }))
    console.log(this.state.division)
  }

  handlePickerOpen = () => {
    this.setState(() => ({
      editMode: true,
    }))
  }

  onFormSubmit = async () => {
    const { division } = this.state
    const userId = this.props.currentUserQuery.User.id

    await this.props.updateUserDivision({
      variables: {
        userId,
        division
      }
    })
  }

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
          division={this.state.division}
          navigation={this.props.navigation}
          handleLogOut={this.handleLogOut}
          handlePickerChange={this.handlePickerChange}
          handlePickerOpen={this.handlePickerOpen}
          onFormSubmit={this.onFormSubmit}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery($userId: ID) {
    User(id: $userId) {
      id
      email
      firstName
      lastName
      division
      role
    }
  }
`

const UPDATE_USER_DIVISION = gql`
mutation UpdateUserDivision($userId: ID!, $division: String) {
  updateUser(id: $userId, division: $division) {
    id
    firstName
    lastName
    email
    role
    division
  }
}
`

const ProfileContainerWithData = compose(
  graphql(CURRENT_USER_QUERY, {
    name: 'currentUserQuery',
    options: ({ userId }) => ({ variables: { userId } })
  }),
  graphql(UPDATE_USER_DIVISION, {
    name: 'updateUserDivision'
  }),
)(ProfileContainer)

export default ProfileContainerWithData