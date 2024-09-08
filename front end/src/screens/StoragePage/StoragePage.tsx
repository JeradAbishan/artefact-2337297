// src/screens/StoragePage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  id: number;
  originalText: string;
  aiSummarizedText: string;
  generatedTime: string;
}

const StoragePage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          console.error('No token found');
          return;
        }

        // Make API call to fetch notes for the logged-in user
        const response = await axios.get('http://10.0.2.2:8080/api/notes/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        // Sort notes by timestamp (latest on top)
        const sortedNotes = response.data.sort(
          (a: Note, b: Note) => new Date(b.generatedTime).getTime() - new Date(a.generatedTime).getTime()
        );

        // Update state with sorted notes
        setNotes(sortedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const toggleNoteDetails = (noteId: number) => {
    setSelectedNoteId(noteId === selectedNoteId ? null : noteId);
  };

  const deleteNote = async (noteId: number) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      // Make API call to delete the note
      await axios.delete(`http://10.0.2.2:8080/api/notes/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Remove the note from the local state
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      Alert.alert('Error', 'Could not delete the note. Please try again.');
    }
  };

  const confirmDelete = (noteId: number) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteNote(noteId) },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item, index }: { item: Note; index: number }) => (
    <View style={[styles.noteItem, { backgroundColor: index % 2 === 0 ? '#e0f7fa' : '#f9f9f9' }]}>
      <View style={styles.noteContent}>
        <TouchableOpacity onPress={() => toggleNoteDetails(item.id)}>
          <Text style={styles.timestampText}>{new Date(item.generatedTime).toLocaleString()}</Text>
        </TouchableOpacity>
        {selectedNoteId === item.id && (
          <View style={styles.noteDetails}>
            <Text style={styles.header}>Original Text:</Text>
            <Text style={styles.text}>{item.originalText}</Text>
            <Text style={styles.header}>AI Summarized Text:</Text>
            <Text style={styles.text}>{item.aiSummarizedText}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  noteContent: {
    flex: 1,
  },
  timestampText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteDetails: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginTop: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
  deleteButton: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StoragePage;
