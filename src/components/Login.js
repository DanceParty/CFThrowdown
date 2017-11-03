import React from 'react'
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

// auth
import { onSignIn } from '../utils/auth'

// apollo
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    loading: false,
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

  onSubmitLogin = async () => {
     const { email, password } = this.state
     console.log('** Signing In...')
     const result = await this.props.signinUserMutation({
       variables: {
         email,
         password
       }
     })
     const id = result.data.signinUser.user.id
     const token = result.data.signinUser.token
     onSignIn(id, token)
     console.log('** User signed in. navigating to `Signed In`')
     this.props.navigation.navigate("SignedInNav")
  }

  render() {
    return (
      <Card>
        <FormLabel>Email</FormLabel>
        <FormInput 
          placeholder="Email address..."
          onChangeText={this.handleEmailChange}
        />

        <FormLabel>Password</FormLabel>
        <FormInput 
          secureTextEntry 
          placeholder="Password..." 
          onChangeText={this.handlePasswordChange}
        />

        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN IN"
          onPress={this.onSubmitLogin}
        />
      </Card>
    )
  }
}

const SIGNIN_USER_MUTATION = gql`
mutation SigninUserMutation($email: String!, $password: String!) {
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

export default graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })(Login)