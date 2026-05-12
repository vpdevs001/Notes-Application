import CardAddOrEdit from "@/components/cardAddOrEdit";
import CardDisplay from "@/components/cardDisplay";
import { darkTheme, lightTheme } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
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

function getTimeOfDay() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 20) return "evening";
  return "night";
}

export default function Index() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  useEffect(() => {
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addNoteHandler = () => {
    setEditingNoteId(null);
    setNewNoteTitle("");
    setNewNoteDescription("");
    setIsModalVisible(true);
  };

  const editNoteHandler = (note: Note) => {
    setEditingNoteId(note.id);
    setNewNoteTitle(note.title);
    setNewNoteDescription(note.description);
    setIsModalVisible(true);
  };

  const saveNote = () => {
    if (newNoteTitle.trim() === "" || newNoteDescription.trim() === "") return;

    if (editingNoteId !== null) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNoteId
            ? { ...note, title: newNoteTitle, description: newNoteDescription }
            : note,
        ),
      );
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now(),
        title: newNoteTitle,
        description: newNoteDescription,
      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }

    setNewNoteTitle("");
    setNewNoteDescription("");
    setEditingNoteId(null);
    setIsModalVisible(false);
  };

  const cancelAddNote = () => {
    setNewNoteTitle("");
    setNewNoteDescription("");
    setEditingNoteId(null);
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
                {editingNoteId !== null ? "Edit Note" : "Add New Note"}
              </Text>
              <CardAddOrEdit
                title={newNoteTitle}
                titleChangeHandler={setNewNoteTitle}
                description={newNoteDescription}
                descriptionChangeHandler={setNewNoteDescription}
                saveHandler={saveNote}
                cancelHandler={cancelAddNote}
                theme={theme}
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
                  timeOfDay === "night" || isDarkMode
                    ? "#fff"
                    : theme.textColor,
              },
            ]}
          >
            My Notes
          </Text>
          <Pressable
            onPress={toggleTheme}
            style={[
              styles.themeToggle,
              {
                backgroundColor: isDarkMode
                  ? "rgba(30, 41, 59, 0.5)"
                  : "rgba(255, 255, 255, 0.4)",
                borderColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              },
            ]}
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={24}
              color={
                timeOfDay === "night" || isDarkMode ? "#fff" : theme.textColor
              }
            />
          </Pressable>
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
            <Pressable onPress={() => editNoteHandler(item)}>
              <CardDisplay
                title={item.title}
                description={item.description}
                theme={theme}
              />
            </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeToggle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
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
    fontFamily: "Poppins_400Regular",
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
    fontFamily: "Poppins_600SemiBold",
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
    fontFamily: "Poppins_700Bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
});
