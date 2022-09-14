import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingComponents = () => {

    return (
        <LottieView
            source={require('../assetes/animate/eat-animate.json')}
            autoPlay loop
        />
    )
}
const styles = StyleSheet.create({

});

export default LoadingComponents