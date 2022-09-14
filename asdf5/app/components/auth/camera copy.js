// // 추가해야할 것
// // 서버에서 지문 검증 완료됬다는 결과를 받고
// // 다음페이지 버튼 나오게 학기
// // 

// import React, { useEffect } from 'react'
// import { StyleSheet, View, Text, Image, Button, Platform, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
// import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
// // import { RNCamera } from 'react-native-camera';
// // import { useCamera } from "react-native-camera-hooks";
// import SERVER_URL from '../../utils/misc'
// import Svg, {
//     Rect,
// } from 'react-native-svg';

// const Camera = ({ navigation }) => {

//     const [UserId, setUserId] = React.useState('')
//     const [photo, setPhoto] = React.useState(null)
//     const [Select, setSelect] = React.useState('')
//     const [Data, setData] = React.useState(null)
//     const [Loading, setLoading] = React.useState(false)


//     const item = [
//         { label: '성인 인증', value: 'adult', inputLabel: '성인 인증!' },
//     ]

//     const createFormData = (photo, body = {}) => {
//         const data = new FormData();

//         data.append('photo', {
//             name: UserId,
//             type: photo.type,
//             uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
//         });
//         data.append('UserId', UserId)
//         data.append('Select', Select)
//         Object.keys(body).forEach((key) => {
//             data.append(key, body[key]);
//         });
//         return data;
//     };

//     const SvgOfCamera = () => {
//         return (
//             <Svg width="200" height="60">
//                 <Rect
//                     x="25"
//                     y="5"
//                     width="150"
//                     height="50"
//                     fill="rgb(0,0,255)"
//                     strokeWidth="3"
//                     stroke="rgb(0,0,0)"
//                 />
//             </Svg>
//         )
//     }

//     //사진촬영 코드
//     const handleChoosePhoto = () => {
//         launchCamera({}, (response) => {
//             console.log('signin photo data is :', response);
//             setPhoto(response)
//         });
//     };

//     //Alert 버튼 
//     const ButtonAlert = (params) => {
//         Alert.alert(
//             "오류!",
//             `${params}`,
//             [
//                 {
//                     text: "Cancle",
//                     onPress: () => console.log(params, "ERROR Cancle Pressed"),
//                     style: "cancel"
//                 },
//             ]
//         )
//     }

//     const DataUpLoading = () => {
//         if (UserId === '') {
//             ButtonAlert('User ID를 입력해주세요')
//         } else if (photo === null) {
//             ButtonAlert('지문 이미지 다시 촬영해주세요')
//         } else if (Select === '') {
//             ButtonAlert('원하는 인증 선택을 해주세요')
//         } else {
//             setLoading(true)
//             fetch(`${SERVER_URL}/api/upload`, {
//                 method: 'POST',
//                 body: createFormData(photo),
//             })
//                 .then(response => {
//                     if (response.ok) {
//                         console.log('SUCCESS')
//                         SendAuth()
//                         setLoading(false)
//                     } else {
//                         setLoading(false)
//                         ButtonAlert('서버연결 실패, 네트워크를 확인해주세요')
//                     }
//                 })
//                 .catch((error) => {
//                     console.log('error', error);
//                 });
//         }
//     }

//     const SendAuth = () => {
//         //fetch(`${SERVER_URL}/api/queryauth/${UserId}`)
//         fetch(`${SERVER_URL}/api/queryauth/${UserId}`)
//             .then(response => response.json())
//             .then(json => navigation.navigate('Finish', { key: Select, Data: json.adultauth }))

//             .catch(function (reason) {
//                 console.log('reason', reason)
//             })
//     }

//     const placeholder = {
//         label: '선택',
//         value: null,
//         color: '#9EA0A4'
//     }

//     return (
//         <View style={styles.container}>
//             {Loading ? <ActivityIndicator size="large" /> : (
//                 <View style={styles.container}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder='User ID를 입력해주세요'
//                         placeholderTextColor='black'
//                         onChangeText={text => setUserId(text)}
//                     />
//                     <TouchableOpacity
//                         onPress={handleChoosePhoto} style={[styles.button, { marginBottom: 10 }]}
//                     >
//                         <Text style={styles.btnText}>지문 촬영</Text>
//                     </TouchableOpacity>
//                     {
//                         photo && (
//                             <>
//                                 <Image
//                                     source={{ uri: photo.uri }}
//                                     style={{ width: 300, height: 300 }}
//                                 />
//                             </>
//                         )
//                     }
//                     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                         <Text>원하시는 인증을 선탣해주세요</Text>
//                         <RNPickerSelect
//                             placeholder={placeholder}
//                             style={pickerSelectStyles}
//                             items={item}
//                             InputAccessoryView={() => null}
//                             onValueChange={(value) => setSelect(value)}
//                         />
//                         <TouchableOpacity
//                             onPress={DataUpLoading}
//                             style={styles.button}
//                         >
//                             <Text style={styles.btnText}>인증하기</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             )}
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
//     text: {
//         alignItems: 'center',
//         justifyContent: 'center'
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
//     textInput: {
//         width: '80%',
//         borderBottomWidth: 1,
//         borderBottomColor: 'black',
//         fontSize: 17,
//         padding: 5,
//         marginTop: 30,
//         marginBottom: 20,
//         color: 'black'
//     },
// })

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         borderWidth: 0.5,
//         borderColor: 'purple',
//         borderRadius: 8,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
// });

// export default Camera


// // 카메라 버튼
// // <Button
// //                 title="Capture"
// //                 color='#1eb900'
// //                 onPressFunction={() => captureHandle()}
// //             />



// import React, { Component, useRef } from "react"
// import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, Button, TouchableWithoutFeedback } from "react-native"
// import { RNCamera } from 'react-native-camera';
// import { useCamera } from "react-native-camera-hooks";
// import Svg, {
//     Ellipse,
//     Rect,
//     Line,
//     Path
// } from 'react-native-svg';

// import {
//     RecoilRoot,
//     atom,
//     selector,
//     useRecoilState,
//     useRecoilValue,
// } from 'recoil';

// import { photoState } from '../../utils/state'

// const { width } = Dimensions.get('screen');



// const RNCameraComponet = ({ navigation, initialProps, route }) => {
//     const [
//         { cameraRef, type, isRecording },
//         { recordVideo, setIsRecording, takePicture },
//     ] = useCamera(initialProps);

//     const [photo, setPhoto] = useRecoilState(photoState)




//     const captureHandle = async () => {
//         try {
//             const data = await takePicture()
//             console.log(data)
//             setPhoto(data)
//             navigation.navigate("Camera")
//         } catch (error) {
//             console.log(error)
//         }
//     }


//     return (
//         <View style={{ flex: 1 }}>
//             <RNCamera
//                 ref={cameraRef}
//                 type={type}
//                 style={{ flex: 1 }}
//                 flashMode={RNCamera.Constants.FlashMode.on}
//             />
//             <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
//                 <Svg
//                     width="200"
//                     height="200"
//                 >
//                     <Rect
//                         width="200"
//                         height="200"
//                         fill="null"
//                         strokeWidth="7"
//                         stroke="black"
//                     />
//                 </Svg>
//             </View>
//             <Button
//                 title="Capture"
//                 color='#1eb900'
//                 onPress={() => captureHandle()}
//             />
//         </View >
//     )
// }

// const styles = StyleSheet.create({
//     preview: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'flex-end'
//     },
// })

// export default RNCameraComponet

