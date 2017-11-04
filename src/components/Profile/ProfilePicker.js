import React from 'react'
import { Picker, Platform, StyleSheet } from 'react-native'


class ProfilePicker extends React.Component {

  handlePickerChange = (itemValue) => {
    this.props.handlePickerChange(itemValue)
  }

  handlePickerOpen = () => {
    this.props.handlePickerOpen()
  }

  render() {
    const { platform, editMode, pickerValue } = this.props
    
    if (platform === 'ios' && editMode) {

      return (
        <View>
          <Picker
            selectedValue={pickerValue}
            onValueChange={(itemValue) => this.handlePickerChange(itemValue)}
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
      )

    } else if (platform === 'ios' && !editMode) {

      return (
        <View style={styles.iosDivision}>
          <TouchableHighlight onPress={this.handlePickerOpen}>
            <Text style={styles.linkText}>
              {pickerValue ? `${pickerValue} (Click to edit)` : 'Select Division'}
            </Text>
          </TouchableHighlight>
        </View>
      )

    } else {

      return (
        <View>
          <Picker
            selectedValue={pickerValue}
            onValueChange={(itemValue) => this.handlePickerChange(itemValue)}
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
      )

    }
  }
}

const styles = StyleSheet.create({
  iosDivision: {
    flex: 1,
    alignItem: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  linkText: {
    color: 'blue'
  }
})

