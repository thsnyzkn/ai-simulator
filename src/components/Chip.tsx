import React from "react";
import {
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Spinner } from ".";
import { useGenerationStatus } from "../hooks/useGenerationStatus";
import { LogoStatus } from "../types";

interface ChipProps {
  status: LogoStatus;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  generationId: string;
}

const Chip: React.FC<ChipProps> = ({
  onPress,
  generationId,
  style,
  textStyle,
}) => {
  const status = useGenerationStatus(generationId);
  const isProcessing = status === "processing";
  const isDone = status === "done";

  const renderContent = () => {
    const content = (
      <>
        <View style={styles.chipContainer}>
          {isProcessing && <Spinner />}
          {isDone && (
            <Image
              source={{ uri: "https://picsum.photos/75/75" }}
              style={styles.placeholderImage}
            />
          )}
          {status === "error" && (
            <Image
              source={require("../assets/error.png")}
              style={styles.errorIcon}
            />
          )}
        </View>
        <View style={[styles.textContainer, textStyle]}>
          <Text style={styles.mainText}>
            {status === "processing"
              ? "Creating Your Design..."
              : status === "done"
              ? "Your Design is Ready!"
              : "Ooops, something went wrong!"}
          </Text>
          <Text style={[styles.subText, isDone && styles.doneText]}>
            {isDone
              ? "Tap to see it."
              : isProcessing
              ? "Ready in 2 minutes"
              : "Click to try again"}
          </Text>
        </View>
      </>
    );

    if (isDone) {
      return (
        <LinearGradient
          colors={["#2938DC", "#943DFF"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.contentContainer}
        >
          {content}
        </LinearGradient>
      );
    }

    return (
      <View style={[styles.contentContainer, styles[`${status}Container`]]}>
        {content}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={isDone ? onPress : undefined}
      disabled={!isDone}
      activeOpacity={isDone ? 0.7 : 1}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  chipContainer: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  textContainer: {
    gap: 2,
    paddingLeft: 16,
  },
  placeholderImage: {
    width: 75,
    height: 75,
    resizeMode: "cover",
  },
  errorIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  processingContainer: {
    backgroundColor: "#27272A",
  },
  errorContainer: {
    backgroundColor: "#EF4444",
  },
  idleContainer: {
    display: "none",
  },
  mainText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "800",
  },
  subText: {
    color: "#71717A",
    fontSize: 14,
    fontWeight: "400",
  },
  doneText: {
    color: "#D4D4D8",
  },
});
export default Chip;
