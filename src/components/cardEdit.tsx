import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface CardEditProps {
  title: string;
  titleChangeHandler: (value: string) => void;
  description: string;
  descriptionChangeHandler: (value: string) => void;
  saveHandler: () => void;
  cancelHandler: () => void;
}

const cardEdit = ({
  title,
  titleChangeHandler,
  description,
  descriptionChangeHandler,
  saveHandler,
  cancelHandler,
}: CardEditProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputs}
        value={title}
        onChangeText={titleChangeHandler}
        placeholder="Title"
      />
      <TextInput
        style={styles.inputs}
        value={description}
        onChangeText={descriptionChangeHandler}
        placeholder="Description"
      />
      <Button title="Save" onPress={saveHandler} color="green" />
      <Button title="Cancel" onPress={cancelHandler} color="red" />
    </View>
  );
};

export default cardEdit;

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 4,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: "red",
  },
  saveButton: {
    backgroundColor: "green",
  },
});
