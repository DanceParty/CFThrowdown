import React from "react";
import { Text, ScrollView, View } from "react-native";

// apollo
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// auth
import { onSignOut } from '../utils/auth'

// components 
import ProfileCard from '../components/ProfileCard'


class Profile extends React.Component {

  render() {
    if (this.props.selectUserQuery.loading) {
      return <Text>Loading Users...</Text>
    }
    if (this.props.selectUserQuery.error) {
      return <Text>Error Querying Users: {this.props.allUsersQuery.error.message}</Text>
    }
    // currently signed in user
    const user = this.props.selectUserQuery.User
    return (
      <ScrollView>
        <View style={{ paddingVertical: 20 }}>
          <ProfileCard user={user} />
        </View>
      </ScrollView>
    )
  }
}

// returns all users
const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      firstName
      lastName
    }
  }
`

// returns null for user
const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    user {
      id
      firstName
      lastName
    }
  }
`

// returns correct user
const SELECT_USER_QUERY = gql`
  query SelectUserQuery($screenProps: ID) {
    User(id: $screenProps) {
      id
      firstName
      lastName
      division
      role
      email
    }
  }
`

const ProfileWithData = graphql(SELECT_USER_QUERY, {
  name: 'selectUserQuery',
  options: ({ screenProps }) => ({ variables: { screenProps } }),
})(Profile)

export default ProfileWithData