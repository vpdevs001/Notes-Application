import CardDisplay from "@/components/cardDisplay";
import { lightTheme as theme } from "@/constants/colors";
import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Note {
  id: number;
  title: string;
  description: string;
}

const bgImages: { [key: string]: any } = {
  morning: require("@/assets/images/morning.jpg"),
  afternoon: require("@/assets/images/afternoon.jpg"),
  evening: require("@/assets/images/evening.jpg"),
  night: require("@/assets/images/night.jpg"),
};

export default function Index() {
  const [notes, setNotes] = useState<Note[]>([
    {
      title: "Note 1",
      description: "Description 1",
      id: 1,
    },
    {
      title: "Note 2",
      description: "Description 2",
      id: 2,
    },
    {
      title: "Note 3",
      description: "Description 3",
      id: 3,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.includes(searchQuery),
  );

  const getTimeOfDay = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 16) return "afternoon";
    if (hour >= 16 && hour < 20) return "evening";
    return "night";
  };

  const timeOfDay = getTimeOfDay();

  return (
    <ImageBackground source={bgImages[timeOfDay]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle={timeOfDay === "night" ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerTitle,
              { color: timeOfDay === "night" ? "#fff" : theme.textColor },
            ]}
          >
            My Notes
          </Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search notes..."
            placeholderTextColor={theme.mutedTextColor}
            style={[
              styles.searchBar,
              {
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                borderColor: theme.borderColor,
                color: theme.textColor,
              },
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            style={[styles.addButton, { backgroundColor: theme.buttonColor }]}
          >
            <Text
              style={[styles.addButtonText, { color: theme.buttonTextColor }]}
            >
              + Add
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={filteredNotes}
          renderItem={({ item }) => (
            <CardDisplay title={item.title} description={item.description} />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.notesList}
          contentContainerStyle={styles.notesListContent}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  notesList: {
    flex: 1,
    width: "100%",
  },
  notesListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 16,
  },
});
