import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const SignupFinish = ({ navigation }) => {

    //const data = route.params.Data

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Text style={{
                    width: '80%',
                    fontSize: 35,
                    color: 'black'
                }}>회원가입을 </Text>
                <Text style={{
                    width: '80%',
                    fontSize: 35,
                    color: 'black'
                }}>완료했습니다.</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}
                    style={[styles.button, { marginTop: 20 }]}
                >
                    <Text style={styles.btnText}>처음화면으로</Text>
                </TouchableOpacity>
            </View>
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
    text: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        elevation: 8,   //그림자
        backgroundColor: 'rgb(20,153,184)',
        borderRadius: 30,          // 끝 뚱글개
        paddingVertical: 10,    //세로 높이
        paddingHorizontal: 20,  //가로 넓이
        marginTop: 10,
    },
    btnText: {
        color: 'rgb(255,255,255)'
    },
})

export default SignupFinish

