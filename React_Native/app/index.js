import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, View, Text, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from './routes'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';


LogBox.ignoreAllLogs();

class App extends Component {
    render() {
        return (
            <RecoilRoot>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </RecoilRoot>
        )
    }
}

const styles = StyleSheet.create({

})

export default App