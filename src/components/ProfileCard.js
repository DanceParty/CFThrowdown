import React from 'react'
import { StyleSheet, Picker, Platform, Text, TouchableHighlight, ScrollView, View } from 'react-native'
import { Card, Button, FormInput, FormLabel } from "react-native-elements";
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons } from "@expo/vector-icons";


class Profile extends React.Component {

  state = {
    selectedPickerValue: this.props.user.division || '',
    editDivision: false,
  }

  setPickerValue = (value) => {
    this.setState(() => {
      selectedPickerValue: value
    })
  }

  render() {
    return (
      <Card>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableHighlight
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
          >
            <MaterialCommunityIcons name="exit-to-app" size={30} color="#03A9F4" />
          </TouchableHighlight>    
        </View>
    
        <FormLabel>Email</FormLabel>
        <FormInput disabled value={this.props.user.email}/>
        <FormLabel>First Name</FormLabel>
        <FormInput disabled value={this.props.user.firstName}/>
        <FormLabel>Last Name</FormLabel>
        <FormInput disabled value={this.props.user.lastName}/>
        <FormLabel>Division</FormLabel>

        {/* IOS Only */}
        {
          Platform.OS === 'ios' ? 

          (
            this.state.editDivision ? 
              <View>
              <Picker
                selectedValue={this.state.selectedPickerValue}
                onValueChange={(itemValue, itemIndex) => 
                  this.setState(() => ({ selectedPickerValue: itemValue, editDivision: false }))
                }
              >
                <Picker.Item label="(Select a Division)" value="" />
                <Picker.Item label="RX" value="RX" />
                <Picker.Item label="Scaled" value="Scaled" />
                <Picker.Item label="Masters 35-39" value="Masters 35-39" />
                <Picker.Item label="Masters 40-44" value="Masters 40-44" />
                <Picker.Item label="Masters 45-49" value="Masters 45-49" />
                <Picker.Item label="Masters 50-54" value="Masters 50-54" />
                <Picker.Item label="Masters 55-59" value="Masters 55-59" />
                <Picker.Item label="Masters 60+" value="Masters 60+" />
              </Picker>
            </View>
          :
            <View style={styles.iosDivision}>
              <TouchableHighlight
                onPress={() => this.setState(() => ({ editDivision: true }))}
              >
                <Text style={styles.linkText}>
                  {this.state.selectedPickerValue ? this.state.selectedPickerValue : 'Select Division'}
                </Text>
              </TouchableHighlight>
            </View>
          )

          :

          <View>
            <Picker
              selectedValue={this.state.selectedPickerValue}
              onValueChange={(itemValue, itemIndex) => this.setPickerValue(itemValue)}
            >
              <Picker.Item label="RX" value="RX" />
              <Picker.Item label="Scaled" value="Scaled" />
              <Picker.Item label="Masters 35-39" value="Masters 35-39" />
              <Picker.Item label="Masters 40-44" value="Masters 40-44" />
              <Picker.Item label="Masters 45-49" value="Masters 45-49" />
              <Picker.Item label="Masters 50-54" value="Masters 50-54" />
              <Picker.Item label="Masters 55-59" value="Masters 55-59" />
              <Picker.Item label="Masters 60+" value="Masters 60+" />
            </Picker>
          </View>
        }

        <FormLabel>Role</FormLabel>
        <FormInput disabled value={this.props.user.role}/>

        <Button
          backgroundColor="#03A9F4"
          title="SAVE"
          onPress={() => {
            this.props.onSaveProfile(this.state.selectedPickerValue)
          }}
        />
        
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  cardTitle: {
    flex: 1,
    justifyContent: 'space-around'
  },
  iosDivision: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  linkText: {
    color: 'blue',
  },
})

/*const UPDATE_USER_DIVISION = gql`
  mutation UpdateUserDivision($id: ID, $division: String) {
    updateUser(id: $screenProps, division: $division) {
      id
      firstName
      lastName
      email
      role
      division
    }
  }
`*/


export default Profile