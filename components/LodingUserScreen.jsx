// //2.2.2. Приветственный экран
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//     LogInData,
//     registrationData,
//     languageTranslate,
//     getDataFromServer,
//     sendDataToServer,
//     getTokenToServer,
//     userData,
//     sendRequest,
// } from '../Utils.jsx';
// import { styles } from '../main.jsx';

// const LoadingSettingBuddyScreen = async ({ navigation }) => {

//     await AsyncStorage.setItem('access_token', response1.access_token);

//     const dataUserBD = await getTokenToServer(response1.access_token, "/auth/me", "/json");

//     userData.access_token = response1.access_token;
//     userData.user = dataUserBD.role_id;
//     userData.email = dataUserBD.email;
//     userData.id = dataUserBD.id;

//     console.log("--userData--");

//     for (var key in userData) {
//         console.log(key + ': ' + userData[key]);
//     }

//     // Mikhail.zimin.2004@bk.ru
//     // 11111111

//     if (userData.email) {
//         switch (userData.user) {
//             case 1:
//                 navigation.navigate('LoadingSettingISScreen');
//                 break;
//             case 2:
//                 navigation.navigate('LoadingSettingBuddyScreen');
//                 break;

//         }
//     } else {
//         console.log('no user in bd');
//     }

//     const handleLoading = () => {
//         navigation.navigate('BuddysScreen');
//     };

//     setTimeout(() => {
//         navigation.navigate('BuddysScreen');
//     }, 1);



//     return (
//         <View style={styles.main}>
//             <View style={styles.form}>
//                 <Text style={styles.textHeader}>Loading...</Text>
//                 <TouchableOpacity
//                     style={styles.button}
//                     title="loading..."
//                     onPress={handleLoading}
//                 >
//                     <Text style={styles.textButton}>skip</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };



// export default LoadingSettingBuddyScreen;