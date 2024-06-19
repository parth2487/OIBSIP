import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: task, completed: false }]);
      setTask('');
    }
  };

  const updateTask = () => {
    if (task.trim()) {
      setTasks(tasks.map(t => t.id === editingTaskId ? { ...t, title: task } : t));
      setTask('');
      setEditingTaskId(null);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setTask(task.title);
    setEditingTaskId(task.id);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={editingTaskId ? updateTask : addTask}
        >
          <Text style={styles.addButtonText}>
            {editingTaskId ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => setFilter('all')}>
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilter]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')}>
          <Text style={[styles.filterText, filter === 'completed' && styles.activeFilter]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('pending')}>
          <Text style={[styles.filterText, filter === 'pending' && styles.activeFilter]}>Pending</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text
              style={[
                styles.taskText,
                { textDecorationLine: item.completed ? 'line-through' : 'none' },
              ]}
              onPress={() => toggleTaskCompletion(item.id)}
            >
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => startEditing(item)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {tasks.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearAllTasks}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  filterText: {
    fontSize: 16,
    color: 'gray',
  },
  activeFilter: {
    fontWeight: 'bold',
    color: 'black',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    color: 'orange',
    fontSize: 16,
    marginLeft: 8,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
    marginLeft: 8,
  },
  clearButton: {
    marginTop: 16,
    backgroundColor: '#FF6347',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
