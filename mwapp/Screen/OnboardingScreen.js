import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
}

const Skip = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/rn-motor-wash1.png')} />,
          title: 'Splash your Car',
          subtitle: 'Have your car washed at home',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/rn-motor-wash2.jpg')} />,
          title: 'Shine your Car',
          subtitle: 'Get the polish that gives  a new look',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/rn-motor-wash3.png')} />,
          title: 'Many more services',
          subtitle: "Ask for what you need and get it done",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});