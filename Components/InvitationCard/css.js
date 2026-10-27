// InvitationCard/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  // Add to your css.js
acceptedCard: {
  borderColor: '#4CAF50',
  borderWidth: 1,
},
});