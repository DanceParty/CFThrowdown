import React from 'react';
import { Alert, AsyncStorage, BackHandler, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo'

// apollo imports
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink  } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'

// constants
import { GC_AUTH_TOKEN } from './src/utils/constants'

// connect client to Apollo Server

const httpLink = createHttpLink({
  uri: '__SIMPLE_API_ENDPOINT__'
})

const authLink = setContext((_, { headers }) => {
  let token = ''
  AsyncStorage.getItem(GC_AUTH_TOKEN)
    .then(res => {
      return {
        headers: {
          ...headers,
          authorization: res ? `Bearer ${res}` : null
        }
      }
    })
    .catch(err => console.log(err))
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
    console.log('App: userId', userId)
    const Layout = createRootNavigator(userId)
    return (
      <ApolloProvider client={client}>
        <Layout screenProps={userId}/>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
});
