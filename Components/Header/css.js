// headerStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  greetingWrapper: {
    flex: 1,
  },
  greeting: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#cccccc',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#cccccc',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  profileButton: {
    padding: 4,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  placeholder: {
    width: 44,
    height: 44,
  },
});