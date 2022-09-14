//서버에서 인증 결과값 받은 후 출력

import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Button, TouchableOpacity, Image } from 'react-native'
import SERVER_URL from '../../utils/misc'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Man from '../../assetes/images/man.png'
import Child from '../../assetes/images/child.png'
import Disabled from '../../assetes/images/disabled.png'
import Unmatched from '../../assetes/images/unmatched.png'


const Finish = ({ navigation, route }) => {

    //아이콘 선업 
    const human = <Icon name='human' size={30} color='black' />
    const human_child = <Icon name='human-child' size={30} color='black' />
    const exclamation_thick = <Icon name='exclamation-thick' size={80} color='black' style={{ marginBottom: 50 }} />

    //camera.js에서 받아온 데이터들
    const auth = route.params.key
    const data = route.params.Data

    //useState 선언
    const [Loading, setLoading] = React.useState(false)
    const [value, setValue] = React.useState(1)
    const [Data, setData] = React.useState(null)


    console.log('data : ', data)


    //학생의 경우
    const IfStudent = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Image
                    source={Child}
                    style={{
                        resizeMode: 'contain',
                        width: 200, height: 200,
                        paddingTop: 400
                    }}
                />
                <Text style={styles.Text}>본인인증 결과</Text>
                <Text style={[styles.Text, { color: 'red' }]}>미성년자</Text>
                <Text style={styles.Text}>입니다</Text>
            </View>
        )
    }

    //성인
    const IfAdult = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Image
                    source={Man}
                    style={{
                        resizeMode: 'contain',
                        width: 200, height: 200,
                        paddingTop: 400
                    }}
                />
                <Text style={styles.Text}>본인인증 결과</Text>
                <Text style={[styles.Text, { color: 'red' }]}>성인</Text>
                <Text style={styles.Text}>입니다</Text>
            </View>
        )
    }

    //매칭실패
    const IfUnmatches = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Image
                    source={Unmatched}
                    style={{
                        resizeMode: 'contain',
                        width: 200, height: 200,
                        paddingTop: 400
                    }}
                />
                <Text style={styles.Text}>본인인증 결과</Text>
                <Text style={[styles.Text, { color: 'red' }]}>불일치</Text>
                <Text style={styles.Text}>입니다</Text>
            </View>
        )
    }

    //회원아이디가 존재하지 않음 회원가입부터
    const IfNoneId = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                {exclamation_thick}
                <Text style={styles.Text}>본인인증 결과</Text>
                <Text style={[styles.Text, { color: 'red' }]}>아이디가</Text>
                <Text style={styles.Text}>존재하지 않습니다.</Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            {Loading ? <ActivityIndicator size="large" color="rgb(20,153,184)" /> : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                    {(() => {
                        if (data === 'student') {
                            return (IfStudent())
                        } else if (data === 'adult') {
                            return (IfAdult())
                        } else if (data === 'unmatches') {
                            return (IfUnmatches())
                        } else if (data === 'noneId') {
                            return (IfNoneId())
                        } else if (data === "") {
                            return (<View style={{ flex: 1 }}>
                                <Text style={{ color: 'black' }}> 안들어옴</Text>
                            </View>
                            )
                        }
                    })()}
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignIn')}
                            style={[styles.button, { marginTop: 20 }]}
                        >
                            <Text style={styles.btnText}>처음화면으로</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        backgroundColor: 'rgb(255,255,255)'
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
    Text: {
        width: '80%',
        fontSize: 35,
        color: 'black'
    }
})

export default Finish

