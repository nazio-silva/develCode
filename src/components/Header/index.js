import React from "react"
import { Header } from "react-native-elements";

import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';

const HeaderComponent = ({ title, icon, onPress }) => {

  const renderComponentLeft = () => (
    icon === "" ? null : <TouchableOpacity onPress={() => onPress()}><Icon name={icon} type='simple-line-icon' color='#FFF' /></TouchableOpacity> 
  )

  return (
    <Header
      leftComponent={renderComponentLeft}
      centerComponent={{ text: title, style: { color: '#fff', fontSize: 20 } }}
    />
  )
}

export default HeaderComponent;