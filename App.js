import React from 'react'
import { Alert, AsyncStorage, BackHandler, StyleSheet, Text, View } from 'react-native'
import { Constants } from 'expo'

// apollo imports
import { ApolloProvider } from 'react-apollo'
import { client } from './src/utils/apollo-config'

// components
import WorkoutList from './src/components/WorkoutList'

// navigators
import { createRootNavigator } from './src/utils/router.js'

// auth
import { getUserId } from './src/utils/auth'

export default class App extends React.Component {

  state = {
    userId: '',
    checkedSignIn: false,
  }

  componentDidMount() {
    getUserId()
      .then(res => this.setState(() => ({ userId: res, checkedSignIn: true })))
      .catch(err => Alert.alert("Error", `${err}`))
  }

  render() {
    const { checkedSignIn, userId } = this.state

    if (!checkedSignIn) {
      return null
    }
    const Layout = createRootNavigator(userId)
    return (
      <ApolloProvider client={client}>
        <Layout screenProps={userId}/>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
})
