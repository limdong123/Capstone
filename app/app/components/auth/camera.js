import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Text, Image, Button, Platform, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import SERVER_URL from '../../utils/misc'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { photoState } from '../../utils/state'
import CheckBox from '@react-native-community/checkbox';


const Camera = ({ navigation, route }) => {

    const [UserId, setUserId] = React.useState('')              //UserId state
    const [Select, setSelect] = React.useState('')              //Select state
    const [Loading, setLoading] = React.useState(false)
    const [photo, setPhoto] = useRecoilState(photoState)
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

    //폼데이터 생성
    const createFormData = (photo, body = {}) => {
        const data = new FormData();

        data.append('photo', {
            name: UserId,
            uri: photo.uri,
            type: 'image/jpg'
        });
        data.append('UserID', UserId)
        data.append('Select', Select)
        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });
        return data;
    };

    //60초이상 되면 탈출
    const TimeoutLoading = setTimeout(() => setLoading(false), 60000)

    //Alert 버튼 
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
    //데이터 보내기
    const DataUpLoading = () => {
        TimeoutLoading  //60초 이상 로딩시 탈출
        if (UserId === '') {            //오류처리
            ButtonAlert('User ID를 입력해주세요')
        } else if (photo === null) {
            ButtonAlert('지문 이미지 다시 촬영해주세요')
        } else if (Select === '') {
            ButtonAlert('원하는 인증 선택을 해주세요')
        }
        else {
            setLoading(true)            //로딩 시작
            fetch(`${SERVER_URL}/api/upload`, {     //api/upload 데이터 전송
                method: 'POST',
                body: createFormData(photo),
            })
                .then(response => {
                    //console.log(response.what)
                    return response.json()
                })
                .then(data => {
                    if (data.what === "matched") {      //지문 매칭될시 SendAuth실행
                        console.log("matched")
                        SendAuth()
                    } else if (data.what === "unmatched") {
                        console.log("unmatched")
                        setPhoto(null)
                        setLoading(false)
                        ButtonAlert('지문 매칭에 실패했습니다. 지문사진을 다시 촬영해주세요')
                    } else if (data.what === "noID") {
                        console.log('none Id')
                        setPhoto(null)
                        setLoading(false)
                        ButtonAlert('아이디를 찾을 수 없습니다. 아이디를 확인해 주세요')
                    } else {
                        console.log('netWork Error')
                        setPhoto(null)
                        setLoading(false)
                        ButtonAlert('네트워크가 오류. 다시 시도해 주세요')
                    }
                })
                .catch((error) => {
                    console.log('error to api/uploading', error);
                    console.log('netWork Error')
                    setPhoto(null)
                    setLoading(false)
                    ButtonAlert('네트워크가 응답하지 않습니다. 다시 시도해 주세요')
                });
        }
    }

    const SendAuth = () => {        //본인인증 결과 받고 다음 페이지로 이동
        //fetch(`${SERVER_URL}/api/queryauth/${UserId}`)
        fetch(`${SERVER_URL}/api/queryauth/${UserId}`)
            .then(response => response.json())
            .then(json => navigation.navigate('Finish', { key: Select, Data: json.adultauth }))

            .catch(function (reason) {
                console.log('reason', reason)
            })
        setPhoto(null)
    }

    const pickmove = async () => {              //사진 촬영 전 알림 + 카메라 작동
        PhotoAlert("지문을 빨간 박스안에 넣어주세요")
        navigation.navigate("RNCamera")
    }

    const checkboxClick = (newValue) => {       //인증 선택하는 checkbox
        setToggleCheckBox(newValue)
        if (newValue === true) {
            setSelect('adult')
        } else {
            setSelect("")
        }
    }

    return (
        <View style={styles.container}>
            {Loading ? <ActivityIndicator
            /> : (
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='User ID를 입력해주세요'
                        placeholderTextColor='gray'
                        onChangeText={text => setUserId(text)}
                        autoCapitalize={'none'}
                    />
                    <TouchableOpacity
                        onPress={pickmove} style={[styles.button, { marginBottom: 10 }]}
                    >
                        <Text style={styles.btnText}>지문 촬영</Text>
                    </TouchableOpacity>
                    {
                        photo !== null ?
                            <View style={{
                                width: 300,
                                height: 300,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: 'rgb(20,153,184)',
                                borderWidth: 1,
                            }}>
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{ width: 300, height: 300 }}
                                />
                            </View>
                            :
                            <View style={{
                                width: 300,
                                height: 300,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: 'rgb(20,153,184)',
                                borderWidth: 1,
                            }}>
                                <Text style={{ color: "grey", fontSize: 17 }}>
                                    지문을 촬영해주세요
                                </Text>
                            </View>

                    }
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', marginTop: 30 }}>원하시는 인증을 선택해주세요</Text>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                disabled={false}
                                tintColors={'black'}
                                value={toggleCheckBox}
                                onValueChange={(newValue) => checkboxClick(newValue)}
                                style={{ ...styles.checkbox, }}
                            />
                            <Text style={{ ...styles.label, color: 'black' }}>성인인증</Text>
                        </View>
                        <TouchableOpacity
                            onPress={DataUpLoading}
                            style={styles.button}
                        >
                            <Text style={styles.btnText}>인증하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        backgroundColor: 'rgb(255,255,255)'
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
    textInput: {
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
        color: 'black',
    },
    checkbox: {
        alignSelf: "center",

    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    label: {
        margin: 8,
    },
})

export default Camera
