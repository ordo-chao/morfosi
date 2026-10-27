// InvitationCard/index.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './css.js';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getEventIconInfo } from '../../Utils/eventIcons.js';

export default function InvitationCard({ item, onPress, onAccept, onDecline }) {
  const navigation = useNavigation();
  const { icon, library } = getEventIconInfo(item.type);

  const getEventIcon = () => {
    if (library === 'Ionicons') {
      return <Ionicons name={icon} size={16} color="#cccccc" />;
    } else {
      return <MaterialCommunityIcons name={icon} size={16} color="#cccccc" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted':
        return '#4CAF50';
      case 'declined':
        return '#f44336';
      default:
        return '#FFA726';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'accepted':
        return 'Going';
      case 'declined':
        return 'Declined';
      default:
        return 'Pending';
    }
  };

  const handleCardPress = () => {
    if (item.rsvpStatus === 'accepted') {
      navigation.navigate('EventDetails', { invitation: item });
    } else {
      onPress?.(item);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      {/* Card Header with Type Badge */}
      <View style={styles.cardHeader}>
        <View style={styles.typeBadge}>
          {getEventIcon()}
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.rsvpStatus) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.rsvpStatus) }]}>
            {getStatusText(item.rsvpStatus)}
          </Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        {/* Optional Image */}
        {item.image && (
          <Image 
            source={item.image} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        )}

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          
          {/* Date & Time */}
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="#999" />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color="#999" />
            <Text style={styles.infoText}>{item.time}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#999" />
            <Text style={styles.infoText} numberOfLines={1}>{item.location}</Text>
          </View>
        </View>
      </View>

      {/* Card Footer with Action Buttons */}
      {item.rsvpStatus === 'pending' && (
        <View style={styles.cardFooter}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.declineButton]}
            onPress={() => onDecline?.(item)}
          >
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => onAccept?.(item)}
          >
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {item.rsvpStatus !== 'pending' && (
        <View style={styles.cardFooter}>
          <Text style={styles.rsvpInfo}>
            {item.rsvpStatus === 'accepted' ? '✓ You\'re going' : '✗ You declined'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}