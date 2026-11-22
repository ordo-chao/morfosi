import Config from 'react-native-config';
import PostHog from 'posthog-react-native';

export const posthog = new PostHog(
  Config.POSTHOG_API_KEY,
  {
    host: Config.POSTHOG_HOST,
    enableSessionReplay: true,
  }
);