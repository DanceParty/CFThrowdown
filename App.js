import React from 'react';
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo'

// apollo imports
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// connect client to Apollo Server
const client = new ApolloClient({
  link: new HttpLink({ uri: '__API_ENDPOINT__' }),
  cache: new InMemoryCache()
})

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

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    getUserId()
      .then(res => this.setState(() => ({ userId: res, checkedSignIn: true })))
      .catch(err => Alert.alert("Error", `${err}`))
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress() {
    return false;
  }


  render() {
    const { checkedSignIn, userId } = this.state

    if (!checkedSignIn) {
      return null
    }
    const Layout = createRootNavigator(userId)
    return (
      <ApolloProvider client={client}>
        <Layout />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
});
