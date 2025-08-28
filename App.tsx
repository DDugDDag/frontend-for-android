/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import { WebView } from 'react-native-webview';
// import Config from 'react-native-config';
import KakaoMapWebView from './components/KakaoMapWebView';
// Native SDK 방식
import KakaoMapNative from './components/KakaoMapNative';

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
  const [useNativeSDK, setUseNativeSDK] = useState(false);
  const [showBicycleRoad, setShowBicycleRoad] = useState(false);

  return (
    <View style={[styles.container, safeAreaInsets]}>
      <Text style={styles.text}>
        Kakao Map ({useNativeSDK ? 'Native SDK' : 'WebView'})
      </Text>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setUseNativeSDK(!useNativeSDK)}
      >
        <Text style={styles.switchButtonText}>
          {useNativeSDK ? 'WebView로 변경' : 'Native SDK로 변경'}
        </Text>
      </TouchableOpacity>

      {useNativeSDK && (
        <TouchableOpacity
          style={[
            styles.switchButton,
            showBicycleRoad ? styles.bicycleButtonOn : styles.bicycleButtonOff,
          ]}
          onPress={() => setShowBicycleRoad(!showBicycleRoad)}
        >
          <Text style={styles.switchButtonText}>
            자전거도로 {showBicycleRoad ? '끄기' : '켜기'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.mapContainer}>
        {useNativeSDK ? (
          <KakaoMapNative
            latitude={36.35068134001625} // 대전 시청
            longitude={127.385312222259}
            level={15}
            showBicycleRoad={showBicycleRoad}
            style={styles.nativeMap}
          />
        ) : (
          <KakaoMapWebView
            latitude={36.35068134001625} // 대전 시청
            longitude={127.385312222259}
            level={5}
          />
        )}
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
  switchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  switchButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  nativeMap: {
    flex: 1,
    width: '100%',
  },
  bicycleButtonOn: {
    backgroundColor: '#ff6b6b',
  },
  bicycleButtonOff: {
    backgroundColor: '#28a745',
  },
  apiKeyText: {
    fontSize: 12,
    marginTop: 10,
    color: '#666',
  },
});

export default App;
