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
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { LogoStatus, RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Chip } from "../components";

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
  const [status, setStatus] = useState<LogoStatus>("error");

  const handleSuggestionPress = (suggestion: SuggestionItem): void => {
    setSelectedStyle(suggestion.id);
  };

  const handleCreatePress = (): void => {
    if (!inputText.trim()) return;
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

  const handleViewResult = () => {
    navigation.navigate("Output", {
      imageUrl: "https://placehold.co/400x400",
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.actionContainer}>
        <Chip status={status} onPress={handleViewResult} style={styles.chip} />
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
          style={[!inputText.trim() && styles.createButtonDisabled]}
          onPress={handleCreatePress}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090B",
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
    fontSize: 13,
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
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  suggestionsScrollView: {
    maxHeight: 150,
  },
  suggestionItem: {
    marginRight: 12,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionImage: {
    width: 90,
    height: 90,
    borderRadius: 13.75,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  suggestionText: {
    color: "#71717A",
    fontSize: 13,
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
  },
  createButtonDisabled: {
    backgroundColor: "rgba(108, 93, 211, 0.5)",
  },
  createButtonText: {
    backgroundColor: "transparent",
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
});

export default InputScreen;
