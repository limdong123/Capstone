//react native navigation 관리 페이지
import React from 'react'
import { Button, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';

//Screens
import SignIn from './components/auth/index'
// import Chose from './components/auth/chose'
import Camera from './components/auth/camera'
import Finish from './components/auth/finish'
// import Matching from './components/auth/matching'
import SignUpComponent from './components/signup/index'
import SignupFinish from './components/signup/signupFinish'
// import ContractComponent from './components/contract/index'
// import Contract from './components/contract/contract'
// import Contract_Finish from './components/contract/contract_finish'
import RNCamera from './components/auth/RNCamera'
import SignUpCamera from './components/signup/SignUpCamera'


const AuthStack = createStackNavigator()
const SignUpStack = createStackNavigator()

const AuthStackComponent = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="지문 촬영" component={SignIn} />
        </AuthStack.Navigator>
    )
}

const SignUpStackComponent = () => {
    return (
        <SignUpStack.Navigator>
            <SignUpStack.Screen name="회원가입" component={SignUpComponent} />
        </SignUpStack.Navigator>
    )
}

export const RootNavigator = () => {
    return (
        <AuthStack.Navigator
        //스크린 옵션을 이용해 화면 위에 뜨는 스크린해더 출력을 취소함
        // screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    title: '본인인증 앱(Test)',
                    headerStyle: {
                        backgroundColor: 'rgb(20,153,184)',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    // headerRight: () => (
                    //     <Button
                    //         onPress={() => alert('This is a button!')}
                    //         title="Info"
                    //         color="rgb(40,180,210)"
                    //         style={{}}
                    //     />

                    // ),
                }}
            />
            <AuthStack.Screen name="Camera" component={Camera} options={{ title: '' }} />
            <AuthStack.Screen name="Finish" component={Finish} options={{ title: '' }} />
            <AuthStack.Screen name="SignUpComponent" component={SignUpComponent} options={{ title: '' }} />
            <AuthStack.Screen name="SignupFinish" component={SignupFinish} options={{ title: '' }} />
            {/* <AuthStack.Screen name="ContractComponent" component={ContractComponent} options={{ title: '' }} />
            <AuthStack.Screen name="Contract" component={Contract} options={{ title: '' }} />
            <AuthStack.Screen name="Contract_Finish" component={Contract_Finish} options={{ title: '' }} /> */}
            <AuthStack.Screen name="RNCamera" component={RNCamera} options={() => ({ gestureEnabled: false, headerShown: false })} />
            <AuthStack.Screen name="SignUpCamera" component={SignUpCamera} options={() => ({ gestureEnabled: false, headerShown: false })} />
        </AuthStack.Navigator >
    )
}

