import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text } from 'react-native';
import Config from 'react-native-config';

interface KakaoMapWebViewProps {
  latitude?: number;
  longitude?: number;
  level?: number;
}

const KakaoMapWebView: React.FC<KakaoMapWebViewProps> = ({
  latitude = 37.566826, // 기본값: 서울 시청
  longitude = 126.9786567,
  level = 3,
}) => {
  const kakaoApiKey = Config.KAKAO_MAP_JS_API_KEY;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Kakao Map</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body, html { 
                width: 100%; 
                height: 100%; 
                overflow: hidden;
                background-color: #f0f0f0;
            }
            #map { 
                width: 100%; 
                height: 100%; 
                background-color: #e0e0e0;
            }
            .loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 16px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div id="loading" class="loading">지도 로딩 중...</div>
        <div id="map"></div>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}"></script>
                <script>
            // 지도 초기화
            if (typeof kakao === 'undefined') {
                document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Kakao Maps SDK 로드 실패</div>';
            } else {
                try {
                    document.getElementById('loading').style.display = 'none';
                    
                    var container = document.getElementById('map');
                    var options = {
                        center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                        level: ${level}
                    };
                    
                    var map = new kakao.maps.Map(container, options);
                    
                    // 마커 추가
                    var markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
                    var marker = new kakao.maps.Marker({
                        position: markerPosition
                    });
                    marker.setMap(map);
                } catch (error) {
                    document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">지도 생성 오류: ' + error.message + '</div>';
                }
            }
        </script>
    </body>
    </html>
  `;

  if (!kakaoApiKey) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Kakao API Key가 설정되지 않았습니다.
        </Text>
      </View>
    );
  } else {
    console.log(kakaoApiKey);
  }

  return (
    <WebView
      style={styles.webview}
      source={{ html: htmlContent }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={false}
      scrollEnabled={false}
      bounces={false}
      mixedContentMode="compatibility"
      allowsInlineMediaPlayback={true}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
});

export default KakaoMapWebView;
