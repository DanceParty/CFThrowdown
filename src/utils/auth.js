import { AsyncStorage } from 'react-native'
import { GC_USER_ID, GC_AUTH_TOKEN } from './constants'

export const onSignIn = (id, token) => {
  AsyncStorage.setItem(GC_USER_ID, id)
  AsyncStorage.setItem(GC_AUTH_TOKEN, token)
}

export const onSignOut = () => {
  AsyncStorage.removeItem(GC_USER_ID)
  AsyncStorage.removeItem(GC_AUTH_TOKEN)
}

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(GC_USER_ID)
      .then(res => {
        if (res !== null) {
          resolve(res)
        } else {
          resolve(false)
        }
      })
      .catch(err => reject(err))
  })
} 