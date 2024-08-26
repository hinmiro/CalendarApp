import React, { useState, useEffect } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarComponent = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      try {
        const data = await AsyncStorage.getItem("NOTES");
        if (data === null) {
          console.log("null data");
        } else {
          const parsed = JSON.parse(data);
          setNotes(parsed);
        }
      } catch (error) {
        console.log("Error removing key from AsyncStorage:", error);
      }
    };

    getdata();
  }, []);

  const addNote = () => {
    if (currentNote.trim()) {
      setNotes((prevNotes) => {
        const updatedNotes = {
          ...prevNotes,
          [selectedDate]: [
            ...(prevNotes[selectedDate] || []),
            currentNote.trim(),
          ],
        };
        AsyncStorage.setItem("NOTES", JSON.stringify(updatedNotes));
        return updatedNotes;
      });
      setCurrentNote("");
    }
  };

  const clearMemory = () => {
    Alert.alert("Confirm", "Do you really want to delete all notes?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("NOTES");
          setNotes({});
        },
      },
    ]);
  };

  const handleRemoveNote = async (date, noteIndex) => {
    const updatedNotes = { ...notes };
    updatedNotes[date] = updatedNotes[date].filter(
      (_, index) => index !== noteIndex
    );
    if (updatedNotes[date].length === 0) {
      delete updatedNotes[date];
    }
    setNotes(updatedNotes);
    try {
      await AsyncStorage.setItem("NOTES", JSON.stringify(updatedNotes));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 2 }}>
        <Calendar
          style={{ height: "auto", margin: "5%" }}
          current={selectedDate}
          minDate={"2000-01-01"}
          maxDate={"2100-01-01"}
          hideExtraDays={true}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            ...Object.keys(notes).reduce((acc, date) => {
              acc[date] = { marked: true, dotColor: "blue" };
              return acc;
            }, {}),
            [selectedDate]: {
              selected: true,
              marked: notes[selectedDate]?.length > 0,
              dotColor: notes[selectedDate]?.length > 0 ? "blue" : undefined,
              selectedColor: "lightpink",
            },
          }}
        />
        <View style={{ marginTop: "2%", flex: 2, paddingLeft: "2%" }}>
          <Text style={{ fontWeight: "bold" }}>
            Notes for {selectedDate.replaceAll("-", ".")}
          </Text>
          {notes[selectedDate]?.length ? (
            <FlatList
              style={{ flex: 1 }}
              data={notes[selectedDate]}
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text key={index} style={{ marginVertical: 0 }}>
                    • {item}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleRemoveNote(selectedDate, index);
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        padding: "0.2%",
                        textAlign: "center",
                        marginRight: "2%",
                        backgroundColor: "red",
                        borderRadius: 4,
                      }}
                    >
                      x
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>-</Text>
          )}
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: "2%" }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              marginVertical: 10,
              padding: 10,
            }}
            placeholder="Type note here"
            value={currentNote}
            onChangeText={setCurrentNote}
          />
          <View style={{}}>
            <TouchableOpacity style={{}} onPress={addNote}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  shadowColor: "white",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 5,
                }}
              >
                Add Note
              </Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={clearMemory}>
              <Text style={{ paddingRight: "2%", color: "red", textAlign: 'right' }}>
                Clear all notes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CalendarComponent;
