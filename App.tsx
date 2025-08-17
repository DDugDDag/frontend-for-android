/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import { WebView } from 'react-native-webview';
// import Config from 'react-native-config';
import KakaoMapWebView from './components/KakaoMapWebView';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container, safeAreaInsets]}>
      <Text style={styles.text}>Kakao Map</Text>
      <View style={styles.mapContainer}>
        <KakaoMapWebView
          latitude={36.35068134001625} // 대전 시청
          longitude={127.385312222259}
          level={5} // 숫자가 작을수록 확대
        />
        {/* 36.35068134001625, 127.385312222259 대전시청 37.566826, 126.9786567 서울시청 */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  apiKeyText: {
    fontSize: 12,
    marginTop: 10,
    color: '#666',
  },
});

export default App;
