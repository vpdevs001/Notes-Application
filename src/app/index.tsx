import CardAddOrEdit from "@/components/cardAddOrEdit";
import CardDisplay from "@/components/cardDisplay";
import { darkTheme, lightTheme } from "@/constants/colors";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
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
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

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
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");

  function getTimeOfDay() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 16) return "afternoon";
    if (hour >= 16 && hour < 20) return "evening";
    return "night";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const addNoteHandler = () => {
    setIsModalVisible(true);
  };

  const saveNote = () => {
    if (newNoteTitle.trim() === "" || newNoteDescription.trim() === "") return;

    const newNote: Note = {
      id: Date.now(),
      title: newNoteTitle,
      description: newNoteDescription,
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setNewNoteTitle("");
    setNewNoteDescription("");
    setIsModalVisible(false);
  };

  const cancelAddNote = () => {
    setNewNoteTitle("");
    setNewNoteDescription("");
    setIsModalVisible(false);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ImageBackground source={bgImages[timeOfDay]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent={true}
        />

        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={cancelAddNote}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.backgroundColor },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.textColor }]}>
                Add New Note
              </Text>
              <CardAddOrEdit
                title={newNoteTitle}
                titleChangeHandler={setNewNoteTitle}
                description={newNoteDescription}
                descriptionChangeHandler={setNewNoteDescription}
                saveHandler={saveNote}
                cancelHandler={cancelAddNote}
              />
            </View>
          </View>
        </Modal>

        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerTitle,
              {
                color:
                  timeOfDay === "night" || colorScheme === "dark"
                    ? "#fff"
                    : theme.textColor,
              },
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
                backgroundColor: theme.cardColor,
                borderColor: theme.borderColor,
                color: theme.textColor,
              },
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            style={[styles.addButton, { backgroundColor: theme.buttonColor }]}
            onPress={addNoteHandler}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
});
