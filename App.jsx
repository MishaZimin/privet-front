import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelectionScreen from './components/StartScreen/LanguageSelectionScreen.jsx';
import WelcomeScreen from './components/StartScreen/WelcomeScreen.jsx';
import RegistrationForm from './components/Registration/RegistrationISForm.jsx';
import EmailScreen from './components/Registration/EmailScreen/EmailScreen.jsx';
import LoadingScreen from './components/StartScreen/LodingScreen.jsx';
import RegistrationBuddyForm from './components/Registration/RegistrationBuddyScreen.jsx';
import LogInForm from './components/LogIn/LogInScreen.jsx';
import StudentsScreen from './components/2.3/StudentsScreen.jsx';
import BuddysScreen from './components/2.4/BuddysScreen.jsx';
import PasswordRecoveryScreen from './components/LogIn/PasswordRecoveryScreen.jsx';
import SetNewPasswordScreen from './components/LogIn/SetNewPassword.jsx';
// import NotGetEmail from './components/Registration/EmailScreen/NotGetEmail.jsx';


const Stack = createNativeStackNavigator();

function App() {

    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="LoadingScreen">
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                <Stack.Screen name="LogInForm" component={LogInForm} />
                <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
                <Stack.Screen name="RegistrationBuddyForm" component={RegistrationBuddyForm} />
                <Stack.Screen name="EmailScreen" component={EmailScreen} />
                <Stack.Screen name="StudentsScreen" component={StudentsScreen} />
                <Stack.Screen name="BuddysScreen" component={BuddysScreen} />
                <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen} />
                <Stack.Screen name="SetNewPasswordScreen" component={SetNewPasswordScreen} />
                {/* <Stack.Screen name="NotGetEmail" component={NotGetEmail} /> */}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
