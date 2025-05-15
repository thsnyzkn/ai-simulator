import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";

import { Background } from "../components";

type Props = {
  route: RouteProp<RootStackParamList, "Output">;
};

const OutputScreen: React.FC<Props> = ({ route }) => {
  const { imageUrl, prompt, selectedStyle } = route.params;

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.content}>
        <View style={styles.designContainer}>
          <Image source={{ uri: imageUrl }} style={styles.designImage} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.promptSection}>
            <Text style={styles.label}>Prompt</Text>
            <View style={styles.copyContainer}>
              <Image source={require("../assets/copy.png")} />
              <Text style={styles.value}>Copy</Text>
            </View>
          </View>
          <View style={styles.styleSection}>
            <Text style={styles.text}>{prompt}</Text>
            <View style={styles.styleContainer}>
              <Text style={styles.value}>{selectedStyle}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  designContainer: {
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  designImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#27272A",
  },
  promptSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styleSection: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FAFAFA",
  },
  value: {
    fontSize: 12,
    color: "#A1A1AA",
  },
  copyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FAFAFA",
  },
  styleContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
});

export default OutputScreen;
