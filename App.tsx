/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useState, useEffect } from 'react';
 import notifee from '@notifee/react-native';
 import {  StyleSheet,  Text,  Button, View, TextInput,} from 'react-native';
 import messaging from '@react-native-firebase/messaging';
 import { SendMessageServerless } from './Consulta';

// //token fcm
 const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
     console.log(fcmToken);
  } 
 }
 checkToken();


 const App = () => {

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [remoteMessage, setRemoteMessage] = useState('');
  const remoteMessageJson = remoteMessage !== '' ? JSON.parse(remoteMessage) : '';
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   useEffect(()=>{
      const unsubscribe = messaging().onMessage(async remoteMessage =>{
        console.log("Push notification recibida", remoteMessage);
      });
      return unsubscribe();
   },[]);

   const onDisplayLocalNotification = async () => {
     const channelId = await notifee.createChannel({
       id: 'default',
       name: 'Default Channel',
     });


     // Display a notification
     await notifee.displayNotification({
       title: title,
       body: message,
       
       android: {
         channelId,
        //  pressAction: {
        //     id: 'fAxQm7ErTSyJVMRVd-AuqR:APA91bF6sYNT735ASg9HR8JvLYbTZ_hE2Yu8ZCDLGUeuZq90W7xjQqq93Xsewib4tg5vG4nRRe-IbvShq566uH41YskQ_O5bjsE2btsi65fXIQWxZYltJJCsytExPJQPmGpxw_N237IM',
        //  },
       },
     });
    }

    const requestPermission = async ()=>{
      const authStatus = await messaging().requestPermission();
    };

    const SendNotification = async()=>{
      const channelId = await notifee.createChannel({
          id: 'ChannelId',
          name: 'Default ChannelId',
      });
      if(remoteMessage !== ''){
        notifee.displayNotification({
          title: remoteMessageJson.notification.title,
          body: remoteMessageJson.notification.body,
          android:{
            channelId
          }
        }).then(() => setVisible(true))
      };
      setRemoteMessage('');
    };

    useEffect(()=>{requestPermission(); const unsubscribe = messaging() 
      .onMessage(remoteMessage=>setRemoteMessage(JSON.stringify(remoteMessage)))},[]);
    useEffect(()=>{SendNotification();},[remoteMessageJson]);
    
    const sendLocalNotification =async () => {
      setLoading(true) ;
      onDisplayLocalNotification()
      .then(()=>setLoading(false))
      .catch(error=>console.log(error))
      .finally(()=>setVisible(true));
    };
    
    const SendServerlessNotification = async ()=>{
      SendMessageServerless(title, message);
    }



   return (
     <View style={{flex:1, backgroundColor: 'black',alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.sectionTitle}>
                PushNotification TestV
              </Text>
        <TextInput placeholder='Titulo...' 
            placeholderTextColor={'#2F0044'} 
            onChangeText={(title) => setTitle(title)} 
            style={[stylesHere.inputs, {height: 50}]}/>
        <TextInput 
            placeholder='Mensaje...' 
            placeholderTextColor={'#2F0044'} 
            onChangeText={(body) => setMessage(body)} 
            style={[stylesHere.inputs, {height: 50}]}/>
        <View style={{marginTop:10}}>
          <Button title="Enviar notificación local"  onPress={sendLocalNotification}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title="Enviar notificación sin servidor"  onPress={SendServerlessNotification}/>
        </View>
       
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
 const stylesHere = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#EA6F00'
},
content: {
    width: '100%',
    backgroundColor: '#2F0044',
    height: '100%',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    paddingTop: 7
},
title: {
    color: "#fff",
    paddingTop: 15,
    fontSize: 25,
    fontWeight: 'bold'
},
inputs: {
    width: '90%',
    paddingLeft: 14,
    marginTop: 20,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    textAlignVertical: 'top',
    paddingTop: 12
},
});
 