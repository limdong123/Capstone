import React, { useRef } from 'react'
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import SERVER_URL from '../../utils/misc'

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import { SignUpPhotoState } from '../../utils/state'

const SignUpComponent = ({ navigation }) => {


    const [UserId, setUserId] = React.useState('');
    const [Name, setName] = React.useState('');
    const [Age, setAge] = React.useState('');
    const [InFo, setInFo] = React.useState('');
    const [Loading, setLoading] = React.useState(false)
    const [photo, setPhoto] = useRecoilState(SignUpPhotoState)

    //폼데이터 생성
    const createFormData = (photo, body = {}) => {
        const data = new FormData();

        data.append('photo', {
            name: UserId,
            uri: photo.uri,
            type: 'image/jpg'
        });
        data.append('infoid', UserId)
        data.append('name', Name)
        data.append('age', Age)
        data.append('inf', InFo)

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });
        return data;
    };

    //오류창 코드
    const ButtonAlert = (params) => {
        Alert.alert(
            "오류!",
            `${params}`,
            [
                {
                    text: "Cancle",
                    onPress: () => console.log(params, "ERROR Cancle Pressed"),
                    style: "cancel"
                },
            ]
        )
    }
    //로딩 60초 이상 진행시 탈출
    const TimeoutLoading = setTimeout(() => setLoading(false), 60000)

    //파일 전송
    const handleUploadPhoto = () => {
        TimeoutLoading
        if (UserId === '') {
            ButtonAlert('User ID를 입력해주세요')
        } else if (photo === null) {
            ButtonAlert('지문 이미지 다시 촬영해주세요')
        } else if (Name === '') {
            ButtonAlert('이름을 입력 해주세요')
        } else if (Age === '') {
            ButtonAlert('나이를 입력 해주세요')
        } else if (InFo === '') {
            ButtonAlert('지역을 입력 해주세요')
        }
        else {
            setLoading(true)
            fetch(`${SERVER_URL}/api/addinfo`, {        //데이터 전송
                method: 'POST',
                body: createFormData(photo),
            })
                .then(response => { //데이터 전송 성공시 다음페이지 이동
                    if (response.ok) {
                        console.log('SUCCESS')
                        setPhoto(null)
                        navigation.navigate('SignupFinish')
                        // setLoading(false)
                    } else {
                        setPhoto(null)
                        setLoading(false)
                        console.log('false')
                        ButtonAlert("서버 요청 실패")
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                    setPhoto(null)
                    setLoading(false)
                    ButtonAlert("서버 응답 없음")
                });
        }
    };

    //촬영전 주의사항
    const PhotoAlert = (params) => {
        Alert.alert(
            '주의!',
            `${params}`,
            [
                {
                    text: "OK",
                    onPress: () => console.log(params, "ERROR Cancle Pressed"),
                    style: "cancel"
                },
            ]
        )
    }
    //사진촬영전 주의사항 출력 -> 카메라 페이지 이동
    const pickmove = async () => {
        PhotoAlert("지문을 빨간 박스안에 넣어주세요")
        navigation.navigate("SignUpCamera")
    }
    //useRef선언
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    return (
        <ScrollView style={styles.container}>
            {Loading ?
                <ActivityIndicator size="large" />
                : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View>
                            <Text style={{ color: "black" }}>필요한 정보를 입력해주세요</Text>
                        </View>
                        <TextInput
                            style={[styles.TextInput, { margin: 20 }]}
                            autoCapitalize={'none'}
                            placeholder="UserId 입력"
                            placeholderTextColor='gray'
                            onChangeText={(value) => setUserId(value)}
                            blurOnSubmit={false}    //false = 완료버튼 눌러도 입력창이 안사라짐
                            onSubmitEditing={() => ref_input2.current.focus()}  //ref_input2로 이동
                        />
                        <TextInput
                            style={styles.TextInput}
                            autoCapitalize={'none'}
                            placeholder="이름 입력"
                            placeholderTextColor='gray'
                            onChangeText={(value) => setName(value)}
                            onSubmitEditing={() => ref_input3.current.focus()}
                            blurOnSubmit={false}
                            ref={ref_input2}
                        />
                        <TextInput
                            style={styles.TextInput}
                            keyboardType='numeric'
                            maxLength={3}
                            autoCapitalize={'none'}
                            placeholder="나이 입력"
                            placeholderTextColor='gray'
                            onChangeText={(value) => setAge(value)}
                            onSubmitEditing={() => ref_input4.current.focus()}
                            blurOnSubmit={false}
                            ref={ref_input3}
                        />
                        <TextInput
                            style={styles.TextInput}
                            autoCapitalize={'none'}
                            placeholder="지역 입력"
                            placeholderTextColor='gray'
                            onChangeText={value => setInFo(value)}
                            ref={ref_input4}
                        />
                        <TouchableOpacity
                            onPress={pickmove}
                            style={[styles.button, { marginBottom: 10 }]}
                        >
                            <Text style={styles.btnText}>지문 촬영</Text>
                        </TouchableOpacity>
                        {
                            photo !== null ?
                                <View style={{
                                    width: 300, height: 300, justifyContent: 'center', alignItems: 'center', borderColor: 'rgb(20,153,184)',
                                    borderWidth: 1,
                                }}>
                                    <Image
                                        source={{ uri: photo.uri }}
                                        style={{ width: 300, height: 300 }}
                                    />
                                </View>
                                :
                                <View style={{
                                    width: 300, height: 300, justifyContent: 'center', alignItems: 'center', borderColor: 'rgb(20,153,184)',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{ color: "grey", fontSize: 17 }}>
                                        지문을 촬영해주세요
                                    </Text>
                                </View>

                        }
                        <TouchableOpacity
                            onPress={handleUploadPhoto}
                            style={[styles.button, { marginBottom: 10 }]}
                        >
                            <Text style={styles.btnText}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                )}
        </ScrollView >
    )
}


const styles = StyleSheet.create({
    container: {

        display: "flex",
        height: "100%",
        textAlign: "center",
        backgroundColor: 'rgb(255,255,255)',

    },
    text: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        elevation: 8,   //그림자
        backgroundColor: 'rgb(20,153,184)',
        borderRadius: 30,          // 끝 뚱글개
        paddingVertical: 10,    //세로 높이
        paddingHorizontal: 60,  //가로 넓이
        marginTop: 10
    },
    btnText: {
        color: 'rgb(255,255,255)'
    },
    TextInput: {
        elevation: 8,   //그림자
        fontSize: 17,
        marginBottom: 20,
        paddingVertical: 10,    //세로 높이
        paddingHorizontal: 20,  //가로 넓이
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'rgb(20,153,184)',
        width: '80%',

        backgroundColor: 'rgb(255,255,255)',
        color: 'black'

    }
})

export default SignUpComponent

