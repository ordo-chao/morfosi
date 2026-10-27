import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Inverted from #ffffff
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#cccccc', // Inverted from #333
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#aaaaaa', // Inverted from #555
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#222222', // Inverted from #ddd
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#cccccc', // Inverted from #333
    marginBottom: 16,
    backgroundColor: '#121212', // Inverted from #f9f9f9
  },
  // Row wrapper structure for Password + Eye icon
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222222', // Inverted from #ddd
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#121212', // Inverted from #f9f9f9
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#cccccc', // Inverted from #333
  },
  eyeIconContainer: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#ffffff', // Inverted from #000000
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#ffffff', // Inverted from #000000
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#000000', // Inverted from #fff
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    color: '#999999', // Inverted from #666
    fontSize: 14,
    marginBottom: 32,
  },
  registerLink: {
    color: '#ffffff', // Inverted from #000000
    fontWeight: 'bold',
  },
  continueContainer: {
    alignItems: 'center',
  },
  orText: {
    color: '#555555', // Inverted from #aaa
    fontSize: 14,
    marginBottom: 16,
  },
  continue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#222222', // Inverted from #ddd
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#000000', // Inverted from #ffffff
  },
  socialIcon: {
    marginRight: 12,
  },
  continueText: {
    color: '#cccccc', // Inverted from #333
    fontSize: 15,
    fontWeight: '500',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 24,
  },
  // Add these styles to your existing styles object in css.js

dashboardContainer: {
  flex: 1,
  backgroundColor: '#000000',
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 24,
  paddingTop: 60,
  paddingBottom: 24,
  backgroundColor: '#000000',
},
greeting: {
  fontSize: 14,
  color: '#999',
  marginBottom: 4,
},
userName: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#cccccc',
},
profileButton: {
  padding: 4,
},
statsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 24,
  marginBottom: 32,
},
statCard: {
  flex: 1,
  backgroundColor: '#121212',
  borderRadius: 12,
  paddingVertical: 16,
  alignItems: 'center',
  marginHorizontal: 4,
  borderWidth: 1,
  borderColor: '#222222',
},
statNumber: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#ffffff',
  marginBottom: 4,
},
statLabel: {
  fontSize: 12,
  color: '#999',
  letterSpacing: 0.5,
},
sectionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 24,
  marginBottom: 16,
},
sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#cccccc',
},
seeAllText: {
  fontSize: 14,
  color: '#ffffff',
  opacity: 0.8,
},
listContainer: {
  paddingBottom: 32,
},
card: {
  backgroundColor: '#121212',
  borderRadius: 16,
  marginHorizontal: 24,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#222222',
  overflow: 'hidden',
},
cardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#222222',
},
typeBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 12,
  backgroundColor: '#1a1a1a',
},
typeText: {
  fontSize: 12,
  color: '#cccccc',
  marginLeft: 6,
  fontWeight: '500',
},
statusBadge: {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 12,
},
statusText: {
  fontSize: 12,
  fontWeight: '500',
},
cardContent: {
  padding: 16,
},
cardImage: {
  width: '100%',
  height: 160,
  borderRadius: 12,
  marginBottom: 12,
  backgroundColor: '#1a1a1a',
},
textContainer: {
  gap: 8,
},
cardTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#cccccc',
  marginBottom: 2,
},
cardSubtitle: {
  fontSize: 14,
  color: '#999',
  marginBottom: 12,
},
infoRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},
infoText: {
  fontSize: 13,
  color: '#999',
  marginLeft: 8,
  flex: 1,
},
cardFooter: {
  flexDirection: 'row',
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderTopWidth: 1,
  borderTopColor: '#222222',
  gap: 12,
},
actionButton: {
  flex: 1,
  paddingVertical: 10,
  borderRadius: 8,
  alignItems: 'center',
},
acceptButton: {
  backgroundColor: 'rgba(76, 175, 80, 0.15)',
},
declineButton: {
  backgroundColor: 'rgba(244, 67, 54, 0.15)',
},
acceptButtonText: {
  color: '#4CAF50',
  fontSize: 14,
  fontWeight: '600',
},
declineButtonText: {
  color: '#f44336',
  fontSize: 14,
  fontWeight: '600',
},
rsvpInfo: {
  flex: 1,
  textAlign: 'center',
  fontSize: 13,
  color: '#999',
  paddingVertical: 8,
},
});