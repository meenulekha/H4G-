import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/calendarStyles.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, getDay, format, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import ToDoList from '@/components/ToDoList';
import { Image, Text } from 'react-native';



const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const logo = require('@/assets/images/logo-bc.png');

export default function HomeScreen() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date('2025-01-17T10:00:00'),
      end: new Date('2025-01-17T11:00:00'),
    },
    {
      id: '2',
      title: 'Project Deadline',
      start: new Date('2025-01-20T23:59:59'),
      end: new Date('2025-01-20T23:59:59'),
    },
    {
      id: '3',
      title: 'Lunch with Sarah',
      start: new Date('2025-01-18T13:00:00'),
      end: new Date('2025-01-18T14:00:00'),
    },
  ]);

  return (

    <View style={{ flex: 1 }}> {/* Wrap everything in a parent View */}
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>Welcome Sarah</Text>
        <Text style={styles.headerSubtitle}>Your OnePA Dashboard</Text>
      </View>
      <Image source={require('@/assets/images/logo-bc.png')} style={styles.logo} />
    </View>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={styles.calendar}
          views={['month', 'week', 'day']}
          popup
        />
      </View>
      <View style={styles.todoContainer}>
        <ToDoList />
      </View>
    </ScrollView>
  </View>


    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange calendar and todo list side by side
    padding: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between', // Add spacing between calendar and todo list
    alignItems: 'flex-start',
    // Center the calendar vertically
  },
  calendarContainer: {
    flex: 2, // Give the calendar more space compared to the todo list
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 3,
    maxHeight: '80%',
    padding: 10,
    height: 800,
    fontFamily: 'PoppinsN',

  },
  calendar: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    height: '100%', // Set calendar height to fill the container
    width: '100%', // Set calendar width to fill the container
    fontSize: 12, // Make text smaller
    
  },
  todoContainer: {
    flex: 1, // Give the todo list less space compared to the calendar
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 10,
    marginLeft: 16,
  },

  header: {
    flexDirection: 'row', // Align logo and text side by side
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16, // Add spacing below the header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTextContainer: {
    flex: 1, // Allow the text container to take up space
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'PoppinsB',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'PoppinsN',
  },
  logo: {
    width: 80, // Adjust size as needed
    height: 80,
    resizeMode: 'contain', // Keep aspect ratio
  },
});


