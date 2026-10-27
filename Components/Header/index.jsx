// Header.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './css.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({ 
  userName = "Alex", 
  onProfilePress, 
  showBackButton = false, 
  onBackPress,
  title 
}) {
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="arrow-back-outline" size={24} color="#cccccc" />
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      )}
      
      {title && !showBackButton && (
        <Text style={styles.headerTitle}>{title}</Text>
      )}
      
      <TouchableOpacity 
        style={styles.profileButton} 
        onPress={onProfilePress}
      >
        <Ionicons name="person-circle-outline" size={44} color="#cccccc" />
      </TouchableOpacity>
    </View>
  );
}