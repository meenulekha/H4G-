import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import "../../assets/images/sampleprofile.jpg"

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    //profilePhoto: 'https://via.placeholder.com/150', // Placeholder profile picture
    profilePhoto: "../../assets/images/sampleprofile.jpg",
    name: 'Sarah Johnson',
    username: 'sarah.johnson',
    email: 'sarah.johnson@example.com',
    password: '********',
    role: 'Administrator',
    supervisorName: 'John Doe',
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: profile.profilePhoto }}
          style={styles.profilePicture}
        />
      </View>

      {/* Profile Information */}
      <View style={styles.profileDetailsContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.textInput}
          value={profile.name}
          editable={false} // Non-editable for now
        />

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.textInput}
          value={profile.username}
          editable={false} // Non-editable for now
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.textInput}
          value={profile.email}
          editable={false} // Non-editable for now
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.textInput}
          value={profile.password}
          editable={false} // Non-editable for now
          secureTextEntry={true} // Mask password
        />

        <Text style={styles.label}>Role:</Text>
        <TextInput
          style={styles.textInput}
          value={profile.role}
          editable={false} // Non-editable for now
        />

        <Text style={styles.label}>Supervisor Name:</Text>
        <TextInput
          style={styles.textInput}
          value={profile.supervisorName}
          editable={false} // Non-editable for now
        />
      </View>

      {/* Edit and Save Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => alert('Edit Profile')}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => alert('Change Password')}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  profilePictureContainer: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    marginBottom: 20, // Add some spacing below the photo
  },
  profilePicture: {
    width: 150, // Set a fixed width for the photo
    height: 150, // Set the same height as the width for a square
    borderRadius: 75, // Half of width/height to make it round
    borderWidth: 3, // Add a border around the photo
    borderColor: '#ddd', // Light gray border
    backgroundColor: '#f9f9f9', // Fallback background color
  },
  profileDetailsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'PoppinsN',
  },
  textInput: {
    fontSize: 12,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'PoppinsN',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#D496A7',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10, // Oval shape
    alignItems: 'center', // Center text
    justifyContent: 'center', // Center text
    flex: 1,
    marginHorizontal: 10,
    maxWidth:'50%', // Add spacing between buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'PoppinsN',
  },
});
