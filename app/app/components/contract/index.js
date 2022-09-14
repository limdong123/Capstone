// import React from 'react'
// import { Image, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'


// const ContractComponent = ({ navigation }) => {

//     const work = "근로 계약서"
//     const sell = "매매 계약서"
//     const loan = "대출 계약서"

//     return (
//         <View style={styles.container}>
//             <View>
//                 <Text>원하시는 계약을 선택해주세요</Text>
//             </View>

//             <View style={styles.btnView}>
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('Contract', { key: work })}
//                     style={styles.button}
//                 >
//                     <Text style={styles.btnText}>근로 계약서</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('Contract', { key: sell })}
//                     style={styles.button}
//                 >
//                     <Text style={styles.btnText}>매매 계약서</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('Contract', { key: loan })}
//                     style={styles.button}
//                 >
//                     <Text style={styles.btnText}>대출 계약서</Text>
//                 </TouchableOpacity>
//             </View>

//         </View >
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//         textAlign: "center",
//         backgroundColor: 'rgb(255,255,255)'
//     },
//     btnView: {
//         flex: 1,
//         paddingTop: 30,
//     },
//     button: {
//         elevation: 8,   //그림자
//         backgroundColor: 'rgb(20,153,184)',
//         borderRadius: 30,          // 끝 뚱글개
//         paddingVertical: 10,    //세로 높이
//         paddingHorizontal: 60,  //가로 넓이
//         marginTop: 10
//     },
//     btnText: {
//         color: 'rgb(255,255,255)'
//     },
// })

// export default ContractComponent

