import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { LogoStatus, RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Chip, Background } from "../components";

import {
  createGenerationEntry,
  markGenerationAsDone,
} from "../services/generationService";

interface SuggestionItem {
  id: string;
  text: string;
  image: any;
}

const SUGGESTIONS: SuggestionItem[] = [
  {
    id: "1",
    text: "No Style",
    image: require("../assets/nostyle.png"),
  },
  {
    id: "2",
    text: "Abstract",
    image: require("../assets/abstract.png"),
  },
  {
    id: "3",
    text: "Monogram",
    image: require("../assets/monogram.png"),
  },
  {
    id: "4",
    text: "Mascot",
    image: require("../assets/mascot.png"),
  },
];

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Input">;
}

const InputScreen: React.FC<Props> = ({ navigation }) => {
  const [inputText, setInputText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("1");
  const [status, setStatus] = useState<LogoStatus>("idle");

  const [isLoading, setIsLoading] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);

  const mockCompletionTime = Math.floor(
    Math.random() * (60000 - 30000 + 1) + 30000
  ); // Random time between 30-60 seconds

  const handleSuggestionPress = (suggestion: SuggestionItem): void => {
    setSelectedStyle(suggestion.id);
  };

  const handleSurpriseMePress = (): void => {
    const prompts = [
      "A futuristic robot logo with neon lights",
      "A minimalist tree logo with green and brown tones",
      "A retro-style gaming console logo",
      "A sleek and modern car logo",
      "A colorful parrot logo with vibrant feathers",
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setInputText(randomPrompt);
  };

  const handleGenerateLogo = async () => {
    if (!inputText.trim()) return;
    try {
      setIsLoading(true);
      setStatus("processing");
      const id = await createGenerationEntry();
      setDocId(id);
      setIsLoading(false);

      setTimeout(async () => {
        try {
          await markGenerationAsDone(id);
          setStatus("done");
        } catch (error) {
          console.error("Error updating status:", error);
          setStatus("error");
          Alert.alert(
            "Connection Error",
            "Failed to update status. Please check your internet connection and try again."
          );
        }
      }, mockCompletionTime);
    } catch (error) {
      console.error("Error generating logo:", error);
      setStatus("error");
      setIsLoading(false);
      Alert.alert(
        "Connection Error",
        "Failed to generate logo. Please check your internet connection and try again."
      );
    }
  };

  const handleViewResult = () => {
    navigation.navigate("Output", {
      imageUrl: "https://picsum.photos/200",
      selectedStyle:
        SUGGESTIONS.find((item) => item.id === selectedStyle)?.text ||
        "Unknown Style",
      prompt: inputText,
    });
  };

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.actionContainer}>
          <Chip
            generationId={docId ?? ""}
            status={status}
            onPress={handleViewResult}
            style={styles.chip}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Enter Your Prompt</Text>
          <TouchableOpacity onPress={handleSurpriseMePress}>
            <Text style={styles.surpriseText}>🎲 Surprise me</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            multiline
            numberOfLines={8}
            placeholder="A blue lion logo reading 'HEXA' in bold letters"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={[styles.textInput, isFocused && styles.textInputFocused]}
            maxLength={500}
            onChangeText={setInputText}
            value={inputText}
            autoFocus={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Text style={styles.characterCount}>{`${inputText.length}/500`}</Text>
        </View>

        <Text style={styles.suggestionsTitle}>Logo Styles</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.suggestionsScrollView}
        >
          {SUGGESTIONS.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              style={[styles.suggestionItem]}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Image
                source={suggestion.image}
                style={[
                  styles.suggestionImage,
                  suggestion.id === "1" && styles.firstOptionImage,
                  selectedStyle === suggestion.id && styles.selectedImage,
                ]}
                resizeMode="cover"
              />
              <Text
                style={[
                  styles.suggestionText,
                  selectedStyle === suggestion.id && styles.selectedText,
                ]}
              >
                {suggestion.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <LinearGradient
          colors={["#2938DC", "#943DFF"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.createButton}
        >
          <TouchableOpacity
            style={[
              styles.buttonWrapper,
              !inputText.trim() && styles.createButtonDisabled,
            ]}
            onPress={handleGenerateLogo}
          >
            <Text style={styles.createButtonText}>Create</Text>
            <Image
              source={require("../assets/stars.png")}
              style={{ width: 20, height: 20, resizeMode: "cover" }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  surpriseText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
  },
  inputContainer: {
    position: "relative",
  },
  textInput: {
    height: 175,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: 16,
    paddingBottom: 32,
    minHeight: 100,
    textAlignVertical: "top",
  },
  textInputFocused: {
    borderColor: "rgba(250, 250, 250, 1)",
    borderWidth: 1,
  },
  characterCount: {
    position: "absolute",
    bottom: 8,
    left: 12,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
  suggestionsTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  suggestionsScrollView: {
    maxHeight: 150,
  },
  suggestionItem: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  suggestionText: {
    color: "#71717A",
    fontSize: 12,
    textAlign: "center",
    width: "100%",
  },
  selectedText: {
    color: "#FAFAFA",
    fontWeight: "600",
  },
  createButton: {
    position: "absolute",
    bottom: 34,
    left: 0,
    right: 0,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginHorizontal: 20,
  },
  createButtonDisabled: {
    backgroundColor: "rgba(108, 93, 211, 0.5)",
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedImage: {
    borderColor: "#FAFAFA",
  },
  firstOptionImage: {
    backgroundColor: "rgba(41, 56, 220, 0.1)",
    width: 90,
    height: 90,
    padding: 20,
  },
  actionContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  chip: {
    marginTop: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});

export default InputScreen;
