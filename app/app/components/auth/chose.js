// // 무슨 인증 누르는지 결과값 서버로 전달
// // 
// //

// import React, { Component } from 'react'
// import { StyleSheet, View, Text, ScrollView, Button, FlatList } from 'react-native'

// const Chose = ({ navigation }) => {

//     const [chose, setChose] = React.useState('');

//     return (
//         <View style={{ flex: 1 }}>
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
//                 <Text>본인인증 선택 사항 화면 입니다..</Text>
//                 <View>
//                     <FlatList
//                         data={[
//                             { key: '성인' },
//                             { key: '장애인' },
//                             { key: '노인' },
//                         ]}
//                         renderItem={({ item }) =>
//                             <Button
//                                 title={item.key + "인증"}
//                                 onPress={() => navigation.navigate('Finish', { key: item.key })}
//                             />}
//                     />
//                 </View>
//             </View>

//         </View >
//     )
// }


// const styles = StyleSheet.create({
//     listView: {
//         padding: 10,
//         margin: 10
//     }
// })

// export default Chose

