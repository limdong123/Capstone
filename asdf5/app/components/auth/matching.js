// //서버에서 인증 결과값 받은 후 출력

// import React, { useEffect } from 'react'
// import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Button } from 'react-native'
// import SERVER_URL from '../../utils/misc'

// const Matching = ({ navigation, route }) => {

//     const UserId = route.params.UserId

//     const [Loading, setLoading] = React.useState(true)
//     const [matching, setMatching] = React.useState([])

//     const getMatch = async () => {
//         try {
//             const response = await fetch(`${SERVER_URL}/api/send/signin`)
//             const json = await response.json()
//             setMatching(json.match)
//         } catch (err) {
//             console.err(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         getMatch()
//     }, [])

//     return (
//         <View style={{ flex: 1 }}>
//             {Loading ? <ActivityIndicator /> : (
//                 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
//                     <Text>{UserId}님의 지문 검증이 끝났습니다!</Text>
//                     <Text>{matching}합니다.</Text>
//                     <Button
//                         style={{ flex: 1 }}
//                         title='인증 항목 선택으로 가기'
//                         onPress={() => navigation.navigate('Chose')}
//                     />
//                 </View>
//             )}
//         </View>
//     )
// }

// const styles = StyleSheet.create({

// })

// export default Matching

