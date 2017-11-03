import React from 'react'
import { View } from 'react-native'
import { Card, Button, Text } from "react-native-elements";
import { NavigationActions } from 'react-navigation'

class Profile extends React.Component {
  render() {
    return (
      <Card title={`${this.props.user.firstName} ${this.props.user.lastName}`}>
        <View
          style={{
            backgroundColor: "#bcbec1",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 40,
            alignSelf: "center",
            marginBottom: 20
          }}
        >
          <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
        </View>
        <Button
          backgroundColor="#03A9F4"
          title="SIGN OUT"
          onPress={() => {
            onSignOut()
            props.navigation.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'SignedOutNav'})              
              ]
            }))
            props.navigation.navigate("SignedOutNav")
          }}
        />
      </Card>
    )
  }
}

export default Profile