import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';


interface Email {
    id: string;
    subject: string;
    sender: string;
    body: string;
    receivedAt: string;
}

// Mocked Email Data (use Microsoft Graph API or a real email API in production)
const mockEmails = [
    {
        id: '1',
        subject: 'Meeting Reminder',
        sender: 'john.doe@example.com',
        body: 'Don’t forget about the team meeting scheduled for tomorrow at 10 AM.',
        receivedAt: '2025-01-15 09:30 AM',
    },
    {
        id: '2',
        subject: 'Weekly Update',
        sender: 'jane.doe@example.com',
        body: 'Here is the weekly update report for your review.',
        receivedAt: '2025-01-14 04:00 PM',
    },
    {
        id: '3',
        subject: 'Lunch Plans',
        sender: 'mike.smith@example.com',
        body: 'Are you available for lunch tomorrow at 1 PM?',
        receivedAt: '2025-01-13 12:30 PM',
    },
];

export default function MailScreen() {
    const [emails, setEmails] = useState(mockEmails);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [aiSummary, setAiSummary] = useState('');
    const [chatMessages, setChatMessages] = useState([{ id: 1, text: 'Hello! How can I help you today?' }]);
    const [newMessage, setNewMessage] = useState('');

    const handleAIResponse = () => {
        // Mocked AI Summary response
        setAiSummary('This is a brief summary of the email content.');
    };

    const handleChatSend = () => {
        if (newMessage.trim()) {
            setChatMessages((prev) => [...prev, { id: prev.length + 1, text: newMessage }]);
            setNewMessage('');
        }
    };

    const renderEmail = ({ item }: { item: Email }) => (
        <TouchableOpacity onPress={() => setSelectedEmail(item)} style={styles.emailItem}>
            <Text style={styles.emailSubject}>{item.subject}</Text>
            <Text style={styles.emailSender}>{item.sender}</Text>
            <Text style={styles.emailReceivedAt}>{item.receivedAt}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            {/* Left Section: Email List */}
            <View style={styles.leftSection}>
                <Text style={styles.sectionTitle}>Emails</Text>
                <FlatList
                    data={emails}
                    renderItem={renderEmail}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text>No emails available.</Text>}
                />
            </View>

            {/* Right Section: Email Details + AI Features */}
            <View style={styles.rightSection}>
                {selectedEmail ? (
                    <ScrollView>
                        <Text style={styles.emailDetailSubject}>{selectedEmail.subject}</Text>
                        <Text style={styles.emailDetailSender}>From: {selectedEmail.sender}</Text>
                        <Text style={styles.emailDetailBody}>{selectedEmail.body}</Text>
                        <Text style={styles.emailDetailReceivedAt}>
                            Received At: {selectedEmail.receivedAt}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={handleAIResponse} >
                                <Text style={styles.buttonText}>Generate Summary</Text>
                            </TouchableOpacity>
                        </View>
                        {aiSummary ? <Text style={styles.aiSummary}>AI Summary: {aiSummary}</Text> : null}
                    </ScrollView>
                ) : (
                    <Text style={styles.noEmailSelected}>Select an email to view details</Text>
                )}
                {/* Chat Section */}
                <View style={styles.chatSection}>
                    <Text style={styles.chatTitle}>Chat with OpenAI</Text>
                    <ScrollView style={styles.chatMessages}>
                        {chatMessages.map((message) => (
                            <Text key={message.id} style={styles.chatMessage}>
                                {message.text}
                            </Text>
                        ))}
                    </ScrollView>
                    <TextInput
                        placeholder="Type a message..."
                        value={newMessage}
                        onChangeText={setNewMessage}
                        style={styles.chatInput}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={handleChatSend} >
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    leftSection: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    rightSection: {
        flex: 2,
        padding: 16,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        fontFamily: 'PoppinsN',
    },
    emailItem: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    emailSubject: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'PoppinsN',
    },
    emailSender: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'PoppinsN',
    },
    emailReceivedAt: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'PoppinsN',
    },
    emailDetailSubject: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'PoppinsN',
    },
    emailDetailSender: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: 'PoppinsN',
    },
    emailDetailBody: {
        fontSize: 14,
        marginBottom: 16,
        fontFamily: 'PoppinsN',
    },
    emailDetailReceivedAt: {
        fontSize: 12,
        color: '#888',
        marginBottom: 16,
        fontFamily: 'PoppinsN',
    },
    aiSummary: {
        fontSize: 14,
        marginTop: 16,
        fontStyle: 'italic',
        fontFamily: 'PoppinsN',
    },
    noEmailSelected: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#888',
        fontFamily: 'PoppinsN',
    },
    chatSection: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    chatTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    chatMessages: {
        maxHeight: 150,
        marginBottom: 12,
    },
    chatMessage: {
        fontSize: 14,
        marginBottom: 4,
    },
    chatInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
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
        maxWidth: '50%', // Add spacing between buttons
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'PoppinsN',
    },
});
