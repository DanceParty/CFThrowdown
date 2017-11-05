import React from "react";
import { Text, ScrollView, View } from "react-native";

// apollo
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// container
import ProfileContainerWithData from '../components/Profile/ProfileContainer'


class Profile extends React.Component {

  render() {
    return (
      <ScrollView>
        <ProfileContainerWithData
          navigation={this.props.navigation}
          userId={this.props.screenProps}
        />
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

export default Profile