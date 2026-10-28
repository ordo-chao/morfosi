import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Linking,
  Alert 
} from 'react-native';
import { styles } from './css.js';
import Header from '../../Components/Header/index.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getEventIconInfo } from '../../Utils/eventIcons.js';

export default function EventDetails({ navigation, route }) {
  const { invitation } = route.params;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { icon, library } = getEventIconInfo(invitation.type);

  // Only allow access if invitation is accepted
  if (invitation.rsvpStatus !== 'accepted') {
    return (
      <View style={styles.dashboardContainer}>
        <Header 
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          onProfilePress={() => navigation.navigate('Profile')}
          title="Access Denied"
        />
        <View style={styles.accessDeniedContainer}>
          <MaterialCommunityIcons name="lock-outline" size={80} color="#666" />
          <Text style={styles.accessDeniedTitle}>Event Details Locked</Text>
          <Text style={styles.accessDeniedText}>
            You need to accept this invitation first to view detailed information.
          </Text>
          <TouchableOpacity 
            style={styles.backButtonLarge}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const getEventHeroIcon = () => {
    if (library === 'Ionicons') {
      return <Ionicons name={icon} size={80} color="#666" />;
    } else {
      return <MaterialCommunityIcons name={icon} size={80} color="#666" />;
    }
  };

  const handleAddToCalendar = () => {
    Alert.alert('Success', 'Event added to your calendar', [{ text: 'OK' }]);
  };

  const handleGetDirections = () => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(invitation.location)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open maps');
    });
  };

  const handleContactHost = () => {
    Alert.alert('Contact Host', 'This would open a messaging/email interface');
  };

  return (
    <ScrollView style={styles.dashboardContainer} showsVerticalScrollIndicator={false}>
      <Header 
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onProfilePress={() => navigation.navigate('Profile')}
        title="Event Details"
      />

      {/* Hero Image Section */}
      {invitation.image ? (
        <Image source={invitation.image} style={styles.heroImage} resizeMode="cover" />
      ) : (
        <View style={styles.heroPlaceholder}>
          {getEventHeroIcon()}
          <Text style={styles.heroPlaceholderText}>{invitation.type}</Text>
        </View>
      )}

      {/* Event Title Section */}
      <View style={styles.eventHeader}>
        <View style={styles.detailContent}>
          <Text style={styles.eventType}>{invitation.type}</Text>
          <Text style={styles.eventTitle}>{invitation.title}</Text>
          <Text style={styles.eventSubtitle}>{invitation.subtitle}</Text>
        </View>
        <View style={styles.statusIndicator}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Confirmed</Text>
        </View>
      </View>

      {/* QR Code Section - For event check-in */}
      <View style={styles.qrSection}>
        <View style={styles.qrPlaceholder}>
          <MaterialCommunityIcons name="qrcode" size={100} color="#cccccc" />
          <Text style={styles.qrText}>Show this at the event for check-in</Text>
        </View>
      </View>

      {/* Event Details Cards */}
      <View style={styles.detailsContainer}>
        {/* Date and Time */}
        <View style={styles.detailCard}>
          <View style={styles.detailIconContainer}>
            <Ionicons name="calendar-outline" size={24} color="#cccccc" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{invitation.date}</Text>
            <Text style={styles.detailSubValue}>{invitation.time}</Text>
          </View>
        </View>

        {/* Location */}
        <TouchableOpacity style={styles.detailCard} onPress={handleGetDirections}>
          <View style={styles.detailIconContainer}>
            <Ionicons name="location-outline" size={24} color="#cccccc" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{invitation.location}</Text>
            <Text style={styles.detailSubValue}>Tap for directions →</Text>
          </View>
        </TouchableOpacity>

        {/* Dress Code */}
        <View style={styles.detailCard}>
          <View style={styles.detailIconContainer}>
            <MaterialCommunityIcons name="tshirt-crew-outline" size={24} color="#cccccc" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Dress Code</Text>
            <Text style={styles.detailValue}>Semi-Formal</Text>
            <Text style={styles.detailSubValue}>Elegant attire appreciated</Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.detailCard}>
          <View style={styles.detailIconContainer}>
            <Ionicons name="information-circle-outline" size={24} color="#cccccc" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Additional Information</Text>
            <Text style={styles.detailValue}>
              {showFullDescription 
                ? "Join us for an unforgettable evening filled with great food, music, and entertainment. Parking available at the venue. Please bring a valid ID for entry. Vegetarian options will be available."
                : "Join us for an unforgettable evening filled with great food, music, and entertainment..."}
            </Text>
            <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
              <Text style={styles.readMoreText}>
                {showFullDescription ? 'Show less' : 'Read more'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactHost}>
          <Ionicons name="chatbubble-outline" size={20} color="#cccccc" />
          <Text style={styles.contactButtonText}>Message Host</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.calendarButton} onPress={handleAddToCalendar}>
          <Ionicons name="add-circle-outline" size={20} color="#000000" />
          <Text style={styles.calendarButtonText}>Add to Calendar</Text>
        </TouchableOpacity>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>Event Tips</Text>
        <View style={styles.tipCard}>
          <Ionicons name="time-outline" size={20} color="#cccccc" />
          <Text style={styles.tipText}>Arrive 15 minutes early for check-in</Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="card-outline" size={20} color="#cccccc" />
          <Text style={styles.tipText}>Bring your ID for verification</Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="camera-outline" size={20} color="#cccccc" />
          <Text style={styles.tipText}>Don't forget to capture memories!</Text>
        </View>
      </View>
    </ScrollView>
  );
}