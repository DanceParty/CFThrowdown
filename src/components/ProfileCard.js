import React from 'react'
import { StyleSheet, Picker, Platform, Text, TouchableHighlight, ScrollView, View } from 'react-native'
import { Card, Button, FormInput, FormLabel } from "react-native-elements";
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons } from "@expo/vector-icons";

// apollo
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// auth
import { onSignOut } from '../utils/auth'


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

  updateProfile = async () => {
    const { selectedPickerValue } = this.state
    const userId = this.props.user.id
    await this.props.updateUserDivision({
      variables: {
        userId,
        selectedPickerValue
      },
      // update workout's query here for new division
    })
  }

  render() {
    return (
      <Card>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableHighlight
            onPress={() => {
              onSignOut()
              this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'SignedOutNav'})              
                ]
              }))
              this.props.navigation.navigate("SignedOutNav")
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
          onPress={this.updateProfile}
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

const UPDATE_USER_DIVISION = gql`
  mutation UpdateUserDivision($userId: ID!, $selectedPickerValue: String) {
    updateUser(id: $userId, division: $selectedPickerValue) {
      id
      firstName
      lastName
      email
      role
      division
    }
  }
`


export default graphql(UPDATE_USER_DIVISION, {
  name: 'updateUserDivision'
})(Profile)