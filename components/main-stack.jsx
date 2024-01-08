import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuddysScreen from "./Buddy/buddy.jsx"; // Импортируйте ваш компонент BuddysScreen
// import YourInitialScreenComponent from "./components/YourInitialScreenComponent"; // Замените на ваш компонент для начального экрана

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="YourInitialScreen"
            screenOptions={{ headerShown: false }}
        >
            {/* <Stack.Screen name="YourInitialScreen" component={YourInitialScreenComponent} /> */}
            <Stack.Screen name="BuddysScreen" component={BuddysScreen} />
            {/* Добавьте другие экраны, как необходимо */}
        </Stack.Navigator>
    );
};

export default MainStack;
