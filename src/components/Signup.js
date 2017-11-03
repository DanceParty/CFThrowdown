import React from 'react'
import { Alert } from 'react-native'
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

// auth
import { onSignIn } from '../utils/auth'

// apollo
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Signup extends React.Component {

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    loading: false,
  }

  handleFirstNameChange = (firstNameInput) => {
    this.setState(() => ({
      firstName: firstNameInput
    }))
  }

  handleLastNameChange = (lastNameInput) => {
    this.setState(() => ({
      lastName: lastNameInput
    }))
  }

  handleEmailChange = (emailInput) => {
    this.setState(() => ({
      email: emailInput
    }))
  }

  handlePasswordChange = (passwordInput) => {
    this.setState(() => ({
      password: passwordInput,
    }))
  }

  handlePasswordConfirmChange = (passwordConfirmInput) => {
    this.setState(() => ({
      confirmPassword: passwordConfirmInput,
    }))
  }

  onSubmitSignup = async () => {
    if (this.state.password === this.state.confirmPassword) {
      const { firstName, lastName, email, password } = this.state
      console.log('** Creating User')
      const result = await this.props.createUserMutation({
        variables: {
          firstName,
          lastName,
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      onSignIn(id, token)
      console.log('** User created. Navigating to `Signed In`')
      this.props.navigation.navigate("SignedInNav")
    } else {
      Alert.alert('Error:', 'Check that the passwords match and try again')
    }
  }

  render() {
    return (
      <Card>
        <FormLabel>First name</FormLabel>
        <FormInput 
          placeholder="First name..." 
          onChangeText={this.handleFirstNameChange}
        />

        <FormLabel>Last name</FormLabel>
        <FormInput 
          placeholder="Last name..." 
          onChangeText={this.handleLastNameChange}
        />

        <FormLabel>Email</FormLabel>
        <FormInput 
          placeholder="Email address..." 
          onChangeText={this.handleEmailChange}  
        />

        <FormLabel>Password</FormLabel>
        <FormInput 
          placeholder="Password..." 
          onChangeText={this.handlePasswordChange}
        />

        <FormLabel>Confirm password</FormLabel>
        <FormInput 
          placeholder="Confirm password..."
          onChangeText={this.handlePasswordConfirmChange}  
        />

        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN UP"
          onPress={this.onSubmitSignup}
        />

        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="transparent"
          textStyle={{ color: "#bcbec1" }}
          title="Sign In"
          onPress={() => this.props.navigation.navigate("SignIn")}
        />

      </Card>
    )
  }
}

const CREATE_USER_MUTATION = gql`
mutation CreateUserMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  createUser(
    firstName: $firstName,
    lastName: $lastName,
    authProvider: {
      email: {
        email: $email,
        password: $password
      }
    }
  ) {
    id
  }

  signinUser(email: {
    email: $email,
    password: $password
  }) {
    token
    user {
      id
    }
  }
}
`

export default graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })(Signup)