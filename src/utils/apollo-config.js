import { AsyncStorage } from 'react-native'

// constants
import { GC_AUTH_TOKEN } from './constants'

// apollo imports
import { ApolloClient } from 'apollo-client'
import { createHttpLink  } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: '__ENDPOINT__'
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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})