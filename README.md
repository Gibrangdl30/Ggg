cordova build android --prod --release

keytool -genkey -v -keystore grupoar-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias grupoar-key
 /Users/alonso/Library/Android/sdk/build-tools/27.0.3/zipalign -v -p 4 app-release-unsigned.apk app-zip.apk
 /Users/alonso/Library/Android/sdk/build-tools/27.0.3/apksigner sign --ks geo-key.jks --out geo.apk app-zip.apk

cordova build android --release -- --keystore=./grupoar-key.jks --storePassword=sustam --alias=grupoar-key --password=sustam --packageType=bundle

nuevo modulo de chat para servicio en proceso

sudo n 8.11.3
sudo n 12.16.1

remplazar UIApplication.openSettingsURLString por UIApplicationOpenSettingsURLString 
en platforms/ios/Proyecto/Plugins/.....qrscaneer/.....swift

hola@marcoramos.com.mx


$2y$10$0SbqcybN4q1id6tdkWKf/u6IhJcrD6UWp98KqiKPte5mhVIYccfQ.

1832

TECNOCASA

javier.garciareyes@hotmail.com
  gbt cxno 
4178490022214036
4178490022214036