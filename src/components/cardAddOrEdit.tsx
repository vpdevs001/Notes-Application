import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface cardAddOrEditProps {
  title: string;
  titleChangeHandler: (value: string) => void;
  description: string;
  descriptionChangeHandler: (value: string) => void;
  saveHandler: () => void;
  cancelHandler: () => void;
  theme: any;
}

const CardAddOrEdit = ({
  title,
  titleChangeHandler,
  description,
  descriptionChangeHandler,
  saveHandler,
  cancelHandler,
  theme,
}: cardAddOrEditProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.titleInput, { color: theme.textColor }]}
        value={title}
        onChangeText={titleChangeHandler}
        placeholder="Note Title"
        placeholderTextColor={theme.mutedTextColor}
      />
      <TextInput
        style={[styles.descriptionInput, { color: theme.textColor }]}
        value={description}
        onChangeText={descriptionChangeHandler}
        placeholder="Start typing your note..."
        placeholderTextColor={theme.mutedTextColor}
        multiline
        textAlignVertical="top"
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={cancelHandler}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            styles.saveButton,
            { backgroundColor: theme.buttonColor },
          ]}
          onPress={saveHandler}
        >
          <Text style={styles.saveButtonText}>Save Note</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CardAddOrEdit;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  titleInput: {
    fontSize: 18,
    fontWeight: "700",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  descriptionInput: {
    fontSize: 16,
    minHeight: 120,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  button: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  saveButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  cancelButtonText: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "600",
  },
});
