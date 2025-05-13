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

const InputScreen: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("1"); // Default to first style

  const handleSuggestionPress = (suggestion: SuggestionItem): void => {
    setSelectedStyle(suggestion.id);
  };

  const handleCreatePress = (): void => {
    if (!inputText.trim()) return;
    console.log(
      "Create button pressed with:",
      inputText,
      "style:",
      selectedStyle
    );
  };

  const handleSurpriseMePress = (): void => {
    const randomIndex = Math.floor(Math.random() * SUGGESTIONS.length);
    setSelectedStyle(SUGGESTIONS[randomIndex].id);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
            style={[
              styles.suggestionItem,
              selectedStyle === suggestion.id && styles.selectedSuggestion,
            ]}
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
        colors={["#943DFF", "#2938DC"]}
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
    backgroundColor: "#000",
  },
  header: {
    paddingHorizontal: 20,
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
    marginHorizontal: 20,
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
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  suggestionsScrollView: {
    paddingHorizontal: 20,
    maxHeight: 150,
  },
  suggestionItem: {
    marginRight: 12,
    marginTop: 16,
    alignItems: "center",
    width: 90,
    height: 90,
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
  selectedSuggestion: {
    // Removed background color change
  },
  suggestionText: {
    color: "rgba(113, 113, 122, 1)",
    fontSize: 13,
    textAlign: "center",
    width: "100%",
  },
  selectedText: {
    color: "rgba(250, 250, 250, 1)",
    fontWeight: "600",
  },
  createButton: {
    position: "absolute",
    bottom: 34,
    left: 20,
    right: 20,
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
    width: 90,
    height: 90,
    padding: 20,
  },
});

export default InputScreen;
