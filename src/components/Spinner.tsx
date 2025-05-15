import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface SpinnerProps {
  subtitle?: string;
}

export default function Spinner({ subtitle }: SpinnerProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 2,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {
        iterations: -1,
      }
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={75} height={75} viewBox="0 0 150 150">
          <Circle
            cx="75"
            cy="75"
            r="37.5"
            stroke="#FAFAFA"
            strokeWidth="5"
            strokeDasharray="150"
            strokeDashoffset="120"
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
