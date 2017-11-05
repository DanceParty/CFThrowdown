import React from 'react'
import { StyleSheet, Picker, Platform, Text, TouchableHighlight, View } from 'react-native'
import { Card, Button, FormInput, FormLabel } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// components
import ProfilePicker from './ProfilePicker'

class ProfileCard extends React.Component {

  handleLogOut = () => {
    this.props.handleLogOut()
  }

  handlePickerChange = (itemValue) => {
    this.props.handlePickerChange(itemValue)
  }

  render() {
    return (

      <Card>
        {/* Custom Card Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Account</Text>
          <TouchableHighlight
            onPress={this.handleLogOut}
          >
            <MaterialCommunityIcons name="exit-to-app" size={30} color="#03A9F4" />
          </TouchableHighlight>
        </View>

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
          pickerValue={this.props.division || ''}
          handlePickerChange={this.handlePickerChange}
          handlePickerOpen={this.props.handlePickerOpen}
        />

        <Button
          backgroundColor="#03A9F4"
          title="SAVE CHANGES"
          onPress={this.props.onFormSubmit}
        />

      </Card>

    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'flex-start'
  },
  titleContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default ProfileCard