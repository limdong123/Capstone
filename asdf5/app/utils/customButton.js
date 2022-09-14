// CustomButton.js
import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

const CustomButton = () => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Camera')}
            style={styles.button}
        >
            <Text style={styles.btnText}>본인인증</Text>
        </TouchableOpacity>
    )
}

const ButtonStyles = StyleSheet.create({
    button: {
        elevation: 5,   //그림자
        backgroundColor: 'rgb(20,153,184)',
        borderRadius: 30,          // 끝 뚱글개
        paddingVertical: 10,    //세로 높이
        paddingHorizontal: 60,  //가로 넓이
        marginTop: 10
    },
    btnText: {
        color: 'rgb(255,255,255)'
    },
})


export default CustomButton