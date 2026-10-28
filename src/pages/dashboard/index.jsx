// Dashboard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { styles } from './css.js';
import Header from '../../Components/Header/index.jsx';
import InvitationCard from '../../Components/InvitationCard/index.jsx';

export default function Dashboard({ navigation }) {
  // Sample invitations data
  const [invitations, setInvitations] = useState([
    {
      id: '1',
      type: 'Wedding',
      title: 'Sarah & Michael',
      subtitle: 'Wedding Celebration',
      date: 'December 15, 2024',
      time: '6:00 PM',
      location: 'The Grand Hall, NY',
      image: null,
      rsvpStatus: 'pending',
    },
    {
      id: '2',
      type: 'Gaming Session',
      title: 'Friday Night Gaming',
      subtitle: 'Valorant Tournament',
      date: 'December 13, 2024',
      time: '8:00 PM',
      location: 'Online - Discord',
      image: null,
      rsvpStatus: 'accepted',
    },
    {
      id: '3',
      type: 'Coffee / Brunch Meetup',
      title: 'Sunday Brunch',
      subtitle: 'Casual Hangout',
      date: 'December 10, 2024',
      time: '11:00 AM',
      location: 'Starbucks, Downtown',
      image: null,
      rsvpStatus: 'pending',
    },
    {
      id: '4',
      type: 'BBQ / Cookout',
      title: 'Summer BBQ Party',
      subtitle: 'Annual Neighborhood Cookout',
      date: 'January 20, 2025',
      time: '2:00 PM',
      location: 'Central Park, SF',
      image: null,
      rsvpStatus: 'declined',
    },
    {
      id: '5',
      type: 'Birthday Party',
      title: 'Emily\'s 30th Birthday',
      subtitle: 'Surprise Party',
      date: 'December 18, 2024',
      time: '7:30 PM',
      location: 'The Rooftop Garden',
      image: require('../../assets/images/Logo.png'),
      rsvpStatus: 'pending',
    },
    {
      id: '6',
      type: 'Concert',
      title: 'Rock Fest 2024',
      subtitle: 'Live Music Event',
      date: 'December 22, 2024',
      time: '7:00 PM',
      location: 'Madison Square Garden',
      image: null,
      rsvpStatus: 'accepted',
    },
  ]);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleCardPress = (item) => {
    // Only navigate to EventDetails if the invitation is accepted
    if (item.rsvpStatus === 'accepted') {
      navigation.navigate('EventDetails', { invitation: item });
    } else if (item.rsvpStatus === 'pending') {
      // Show alert for pending invites
      Alert.alert(
        'Invitation Not Accepted',
        'You need to accept this invitation first to view event details.',
        [
          { 
            text: 'Accept Now', 
            onPress: () => handleAccept(item),
            style: 'default'
          },
          { 
            text: 'Later', 
            style: 'cancel' 
          }
        ]
      );
    } else if (item.rsvpStatus === 'declined') {
      // Show alert for declined invites
      Alert.alert(
        'Invitation Declined',
        'You have declined this invitation. Would you like to change your response?',
        [
          { 
            text: 'Accept Invitation', 
            onPress: () => handleAccept(item),
            style: 'default'
          },
          { 
            text: 'Keep Declined', 
            style: 'cancel' 
          }
        ]
      );
    }
  };

  const handleAccept = (item) => {
    // Update the invitation status to 'accepted'
    setInvitations(prevInvitations =>
      prevInvitations.map(inv =>
        inv.id === item.id ? { ...inv, rsvpStatus: 'accepted' } : inv
      )
    );
    
  };

  const handleDecline = (item) => {
    // Update the invitation status to 'declined'
    setInvitations(prevInvitations =>
      prevInvitations.map(inv =>
        inv.id === item.id ? { ...inv, rsvpStatus: 'declined' } : inv
      )
    );
  };

  const renderInvitationCard = ({ item }) => (
    <InvitationCard 
      item={item}
      onPress={handleCardPress}
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );

  return (
    <ScrollView style={styles.dashboardContainer}>
      {/* Reusable Header Component */}
      <Header 
        userName="Alex"
        onProfilePress={handleProfilePress}
      />

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {invitations.filter(i => i.rsvpStatus === 'pending').length}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {invitations.filter(i => i.rsvpStatus === 'accepted').length}
          </Text>
          <Text style={styles.statLabel}>Accepted</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{invitations.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Invitations Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Invitations</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={invitations}
        renderItem={renderInvitationCard}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
}