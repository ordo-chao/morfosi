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
});