import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeScreen } from '@/components/template';

function Example() {
  const navigation = useNavigation();
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosString = await AsyncStorage.getItem('todoList');
        const completedString = await AsyncStorage.getItem('completedList');
        const notesString = await AsyncStorage.getItem('notes');
        if (todosString) setTodoList(JSON.parse(todosString));
        if (completedString) setCompletedList(JSON.parse(completedString));
        if (notesString) setNotes(notesString);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todoList', JSON.stringify(todoList));
        await AsyncStorage.setItem('completedList', JSON.stringify(completedList));
        await AsyncStorage.setItem('notes', notes);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveTodos();
  }, [todoList, completedList, notes]);

  const addTodo = () => {
    if (todo.trim()) {
      setTodoList([...todoList, todo]);
      setTodo('');
    } else {
      Alert.alert('Please enter a todo item.');
    }
  };

  const markAsComplete = (item) => {
    setCompletedList([...completedList, item]);
    setTodoList(todoList.filter((todo) => todo !== item));
  };

  const addNote = () => {
    if (notes.trim()) {
      setNotes(notes);
      AsyncStorage.setItem('notes', notes); // Save notes to AsyncStorage
    } else {
      Alert.alert('Please enter a note.');
    }
  };

  const clearNotes = () => {
    setNotes(''); // Clear the notes input
    AsyncStorage.removeItem('notes'); // Clear the saved notes in AsyncStorage
  };

  const TodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.text}>{item}</Text>
      <TouchableOpacity onPress={() => markAsComplete(item)} style={styles.button}>
        <Text style={styles.buttonText}>Mark as Complete</Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToHomePage = () => {
    navigation.navigate('HomePage');
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Today Tasks</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter TODO"
            value={todo}
            onChangeText={setTodo}
          />
          <TouchableOpacity onPress={addTodo} style={styles.button}>
            <Text style={styles.buttonText}>Add TODO</Text>
          </TouchableOpacity>

          {/* ScrollView for the TODO List */}
          <View style={styles.todoContainer}>
            <ScrollView>
              {todoList.map((item, index) => (
                <TodoItem key={index} item={item} />
              ))}
            </ScrollView>
          </View>

          <Text style={styles.sectionTitle}>Your Notes</Text>
          <TextInput
            style={styles.notesInput} // Adjusted style for notes input to match the TODO list box
            placeholder="Enter Notes"
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity onPress={addNote} style={styles.button}>
            <Text style={styles.buttonText}>Save Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearNotes} style={styles.button}>
            <Text style={styles.buttonText}>Clear Notes</Text>
          </TouchableOpacity>

          {/* Center-aligned Home Button */}
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity onPress={navigateToHomePage} style={styles.button}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#0A74DA', // Full page background color set to blue
  },
  container: {
    padding: 20,
    backgroundColor: '#0A74DA', // Maintain the blue background for the container as well
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  notesInput: {
    backgroundColor: '#fff',
    padding: 10,
    height: 200, // Adjusted height for notes input to match the TODO list box
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  todoContainer: {
    backgroundColor: '#fff',
    height: 200, // Height for the TODO list container
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
  bottomButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
});

export default Example;
