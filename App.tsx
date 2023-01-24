/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useEffect } from 'react';
 import notifee from '@notifee/react-native';
 import {  StyleSheet,  Text,  Button, View,} from 'react-native';
 import messaging from '@react-native-firebase/messaging';


// //token fcm
 const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
     console.log(fcmToken);
  } 
 }
 checkToken();


 const App = () => {

   useEffect(()=>{
      const unsubscribe = messaging().onMessage(async remoteMessage =>{
        console.log("Push notification recibida", remoteMessage);
      });
      return unsubscribe();
   },[]);

   const onDisplayLocalNotification = async () => {
     // Request permissions (required for iOS)
     // await notifee.requestPermission()
     // Create a channel (required for Android)
     const channelId = await notifee.createChannel({
       id: 'default',
       name: 'Default Channel',
     });
     // Display a notification
     await notifee.displayNotification({
       title: 'Zegarra test',
       body: 'Soy una notificación usando Notifee 🐱‍🏍',
       
       android: {
         channelId,
         // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
         // pressAction is needed if you want the notification to open the app when pressed
         pressAction: {
            id: 'fAxQm7ErTSyJVMRVd-AuqR:APA91bF6sYNT735ASg9HR8JvLYbTZ_hE2Yu8ZCDLGUeuZq90W7xjQqq93Xsewib4tg5vG4nRRe-IbvShq566uH41YskQ_O5bjsE2btsi65fXIQWxZYltJJCsytExPJQPmGpxw_N237IM',
         },
       },
     });
    }



   return (
     <View style={{flex:1, backgroundColor: 'black',alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.sectionTitle}>
                PushNotification
              </Text>
       <Button title="Display Notification" onPress={onDisplayLocalNotification} />
     </View>
   );
 }
 const styles = StyleSheet.create({
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
     color: 'white',
   },
 });
 
 export default App;
 