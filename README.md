cordova build android --prod --release

keytool -genkey -v -keystore jocose-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias jocose-key
 /Users/alonso/Library/Android/sdk/build-tools/27.0.3/zipalign -v -p 4 app-release-unsigned.apk app-zip.apk
 /Users/alonso/Library/Android/sdk/build-tools/27.0.3/apksigner sign --ks jocose-key.jks --out jocose.apk app-zip.apk

nuevo modulo de chat para servicio en proceso

remplazar UIApplication.openSettingsURLString por UIApplicationOpenSettingsURLString
en platforms/ios/Proyecto/Plugins/.....qrscaneer/.....swift

For Android 
cordova plugin rm cordova-plugin-keyboard 
cordova plugin add cordova-plugin-ionic-keyboard

For ios
cordova plugin rm cordova-plugin-ionic-keyboard 
cordova plugin add cordova-plugin-keyboard 

2132.96
426.59

4947
132*20
2640
