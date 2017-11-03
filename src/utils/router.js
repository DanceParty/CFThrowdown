import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Platform, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { MaterialCommunityIcons } from "@expo/vector-icons";

// pages
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import Workouts from '../screens/Workouts'
import ProfileWithData from '../screens/Profile'

export const SignedOutNav = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
      headerStyle: {
        marginTop: (Platform.OS === 'android') ? Constants.statusBarHeight : 0,
      }
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      headerStyle: {
        marginTop: (Platform.OS === 'android') ? Constants.statusBarHeight : 0,
      }
    }
  }
})

export const SignedInNav = TabNavigator({
  Workouts: {
    screen: Workouts,
    navigationOptions: {
      tabBarLabel: 'Workouts',
      tabBarIcon: ({ tintColor }) => 
        <MaterialCommunityIcons name="dumbbell" size={30} color="black" />
    }
  },
  ProfileWithData: {
    screen: ProfileWithData,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) =>
        <MaterialCommunityIcons name="account" size={30} color="black" />
    }
  }
}, {
  tabBarOptions: {
    style: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  }
})

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedInNav: {
        screen: SignedInNav,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOutNav: {
        screen: SignedOutNav,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    }, {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedInNav' : 'SignedOutNav'
    }
  )
}