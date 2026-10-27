import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log this error to an external logging service here (e.g., Sentry)
    console.error("ErrorBoundary caught an app crash:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRestart = () => {
    // Resets the state back to normal to attempt a rerender
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Application Error</Text>
            <Text style={styles.message}>
              Something went wrong inside the communication module.
            </Text>

            <ScrollView style={styles.debugLog}>
              <Text style={styles.errorText}>
                {this.state.error && this.state.error.toString()}
              </Text>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={this.handleRestart}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    elevation: 4, // Android shadow
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#dc3545', // Danger red
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
    lineHeight: 20,
  },
  debugLog: {
    maxHeight: 150,
    backgroundColor: '#212529',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#f8f9fa',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});