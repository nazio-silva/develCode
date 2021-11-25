import React from "react"
import { View, Text, Dimensions, Image } from "react-native";
import { ListItem, Avatar } from 'react-native-elements'

const ListComponent = ({ navigation, list }) => {
  return (
    <View style={{ flex: 1 }}>
      { 
        list.length > 0 ?
          list.map((object, i) => (
            <ListItem key={i} bottomDivider onPress={() => navigation.navigate("Register", { object: object })}>
              {/* <Avatar source={{uri: l.avatar_url}} /> */}
              {
                object.foto === "" ?
                <View 
                  style={{
                    backgroundColor: "#CCC",
                    width: 100, 
                    height: 100, 
                    borderRadius: 100/2, 
                  }}
                />
                :
                <Image 
                  style={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: 100/2,
                  }} 
                  source={{ 
                    uri: object.foto
                  }} 
                />
              }
              <ListItem.Content>
                <ListItem.Title style={{ color: "#909090" }}>Nome: {object.nome}</ListItem.Title>
                <ListItem.Subtitle style={{ color: "#909090" }}>Código: {object.codigo}</ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: "#909090" }}>Nascimento: {object.dataNascimento}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
          :
          <View style={{ height: Dimensions.get("window").height, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#CCCC", fontSize: 30 }}>Você não cadastrou nenhum item...</Text>
          </View>
      }
    </View>
  )
}

export default ListComponent;