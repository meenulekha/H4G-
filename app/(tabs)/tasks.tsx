import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


interface Task {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    dueDate: string;
    remarks: string;
    people: string[];
    status: 'upcoming' | 'completed';
  }

export default function TasksPage() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [people, setPeople] = useState('');
  const [remarks, setRemarks] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Prepare Project Report',
      startTime: '2025-01-15 09:00 AM',
      endTime: '2025-01-15 10:00 AM',
      dueDate: '2025-01-16',
      remarks: 'Complete before team meeting',
      people: ['john.doe@example.com', 'jane.doe@example.com'],
      status: 'upcoming', // Ensure this is either "upcoming" or "completed"
    },
    {
      id: 2,
      title: 'Team Standup',
      startTime: '2025-01-10 09:00 AM',
      endTime: '2025-01-10 09:30 AM',
      dueDate: '2025-01-11',
      remarks: 'Daily updates',
      people: ['team@example.com'],
      status: 'completed', // Ensure this is either "upcoming" or "completed"
    },
  ]);
  

  


  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title,
      startTime,
      endTime,
      dueDate,
      remarks,
      people: people.split(',').map((email) => email.trim()),
      status: new Date(dueDate) > new Date() ? 'upcoming' : 'completed', // Strictly match the Task type
    };
  
    setTasks((prevTasks) => [...prevTasks, newTask]);
  
    // Clear form inputs
    setTitle('');
    setStartTime('');
    setEndTime('');
    setDueDate('');
    setRemarks('');
    setPeople('');
  };
  

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text>Start: {item.startTime}</Text>
      <Text>End: {item.endTime}</Text>
      <Text>Due Date: {item.dueDate}</Text>
      <Text>People: {item.people.join(', ')}</Text>
      <Text>Remarks: {item.remarks}</Text>
    </View>
  );

  const upcomingTasks = tasks.filter((task) => task.status === 'upcoming');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <View style={styles.container}>
      {/* Left Section: Tasks List */}
      <View style={styles.leftSection}>
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        <FlatList
          data={upcomingTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No upcoming tasks.</Text>}
        />

        <Text style={styles.sectionTitle}>Completed Tasks</Text>
        <FlatList
          data={completedTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No completed tasks.</Text>}
        />
      </View>

      {/* Right Section: Add Task Form */}
      <View style={styles.rightSection}>
        <Text style={styles.sectionTitle}>Create New Task</Text>
        <ScrollView>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Start Time (e.g. 2025-01-15 09:00 AM)"
            value={startTime}
            onChangeText={setStartTime}
            style={styles.input}
          />
          <TextInput
            placeholder="End Time (e.g. 2025-01-15 10:00 AM)"
            value={endTime}
            onChangeText={setEndTime}
            style={styles.input}
          />
          <TextInput
            placeholder="Due Date (e.g. 2025-01-16)"
            value={dueDate}
            onChangeText={setDueDate}
            style={styles.input}
          />
          <TextInput
            placeholder="People Involved (comma-separated emails)"
            value={people}
            onChangeText={setPeople}
            style={styles.input}
          />
          <TextInput
            placeholder="Remarks"
            value={remarks}
            onChangeText={setRemarks}
            style={styles.input}
          />
          <Button title="Add Task" onPress={handleAddTask} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  leftSection: {
    flex: 1,
    marginRight: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  rightSection: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
});
