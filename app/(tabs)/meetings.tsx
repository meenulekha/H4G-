import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface Meeting {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    location: string;
    remarks: string;
    onlineMeeting: boolean;
    invited: string[];
    status: 'upcoming' | 'past';
  }

export default function MeetingsPage() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [remarks, setRemarks] = useState('');
  const [emails, setEmails] = useState('');
  const [onlineMeeting, setOnlineMeeting] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: 'Project Kickoff',
      startTime: '2025-01-10 10:00 AM',
      endTime: '2025-01-10 11:00 AM',
      location: 'Room 101',
      remarks: 'Bring documents',
      onlineMeeting: true,
      invited: ['john.doe@example.com', 'jane.doe@example.com'],
      status: 'past',
    },
    {
      id: 2,
      title: 'Team Standup',
      startTime: '2025-01-20 10:00 AM',
      endTime: '2025-01-20 11:00 AM',
      location: 'Room 202',
      remarks: 'Daily updates',
      onlineMeeting: false,
      invited: ['team@example.com'],
      status: 'upcoming',
    },
  ]);

  const handleAddMeeting = () => {
    const newMeeting: Meeting = {
      id: Date.now(),
      title,
      startTime,
      endTime,
      location,
      remarks,
      invited: emails.split(',').map((email) => email.trim()),
      onlineMeeting,
      status: new Date(startTime) > new Date() ? 'upcoming' : 'past',
    };

    setMeetings((prevMeetings) => [...prevMeetings, newMeeting]);

    // Clear form inputs
    setTitle('');
    setStartTime('');
    setEndTime('');
    setLocation('');
    setRemarks('');
    setEmails('');
    setOnlineMeeting(false);
  };

  const renderMeeting = ({ item }: { item: Meeting }) => (
    <View style={styles.meetingItem}>
      <Text style={styles.meetingTitle}>{item.title}</Text>
      <Text>Start: {item.startTime}</Text>
      <Text>End: {item.endTime}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Online: {item.onlineMeeting ? 'Yes' : 'No'}</Text>
      <Text>Invited: {item.invited.join(', ')}</Text>
      <Text>Remarks: {item.remarks}</Text>
    </View>
  );

  const upcomingMeetings = meetings.filter((meeting) => meeting.status === 'upcoming');
  const pastMeetings = meetings.filter((meeting) => meeting.status === 'past');

  return (
    <View style={styles.container}>
      {/* Left Section: Meetings List */}
      <View style={styles.leftSection}>
        <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
        <FlatList
          data={upcomingMeetings}
          renderItem={renderMeeting}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No upcoming meetings.</Text>}
        />

        <Text style={styles.sectionTitle}>Past Meetings</Text>
        <FlatList
          data={pastMeetings}
          renderItem={renderMeeting}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No past meetings.</Text>}
        />
      </View>

      {/* Right Section: Add Meeting Form */}
      <View style={styles.rightSection}>
        <Text style={styles.sectionTitle}>Create New Meeting</Text>
        <ScrollView>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Start Time (e.g. 2025-01-20 10:00 AM)"
            value={startTime}
            onChangeText={setStartTime}
            style={styles.input}
          />
          <TextInput
            placeholder="End Time (e.g. 2025-01-20 11:00 AM)"
            value={endTime}
            onChangeText={setEndTime}
            style={styles.input}
          />
          <TextInput
            placeholder="Location (e.g. Room 101)"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <TextInput
            placeholder="Remarks"
            value={remarks}
            onChangeText={setRemarks}
            style={styles.input}
          />
          <TextInput
            placeholder="Invite Emails (comma-separated)"
            value={emails}
            onChangeText={setEmails}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setOnlineMeeting(!onlineMeeting)}
          >
            <Text>Join Online: {onlineMeeting ? 'Yes' : 'No'}</Text>
          </TouchableOpacity>
          <Button title="Add Meeting" onPress={handleAddMeeting} />
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
  meetingItem: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  meetingTitle: {
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
  checkboxContainer: {
    marginBottom: 16,
  },
});
