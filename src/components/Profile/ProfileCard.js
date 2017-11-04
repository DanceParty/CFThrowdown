import React from 'react'
import { StyleSheet, Picker, Platform, Text, TouchableHighlight, View } from 'react-native'
import { Card, Button, FormInput, FormLabel } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// components
import ProfilePicker from './ProfilePicker'

class Profile extends React.Component {
  render() {
    return (

      <Card>
        {/* Custom Card Title */}
        <Text>
          <Text style={styles.title}>Account</Text>
          <TouchableHighlight
            onPress={this.props.handleLogOut}
          >
            <MaterialCommunityIcons name="exit-to-app" size={30} color="#03A9F4" />
          </TouchableHighlight>
        </Text>

        {/* Account Form */}
        <FormLabel>Email</FormLabel>
        <FormInput disabled value={this.props.user.email}/>
        <FormLabel>First Name</FormLabel>
        <FormInput disabled value={this.props.user.firstName}/>
        <FormLabel>Last Name</FormLabel>
        <FormInput disabled value={this.props.user.lastName}/>
        <FormLabel>Role</FormLabel>
        <FormInput disabled value={this.props.user.role}/>
        <FormLabel>Division</FormLabel>

        {/* Platform Specific Picker*/}
        <ProfilePicker 
          platform={Platform.OS}
          editMode={this.props.editMode}
          pickerValue={this.props.user.division || ''}
          handlePickerChange={this.props.handlePickerChange}
          handlePickerOpen={this.props.handlePickerOpen}
        />

      </Card>

    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    alignItems: 'flex-start'
  }
})