import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../constants/theme';
import { TabParamList } from '../types';

// Screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import SpiritScreen from '../screens/Spirit/SpiritScreen';
import BodyScreen from '../screens/Body/BodyScreen';
import MindScreen from '../screens/Mind/MindScreen';
import WealthScreen from '../screens/Wealth/WealthScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBarButton = ({ children, onPress }: any) => (
    <TouchableOpacity
        style={styles.customButtonContainer}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={styles.customButton}>
            {children}
        </View>
    </TouchableOpacity>
);

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    backgroundColor: COLORS.surface,
                    borderTopWidth: 0,
                    height: 70,
                    borderRadius: 35,
                    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
                    paddingTop: 10,
                    ...SHADOWS.large,
                    elevation: 8, // For Android
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textMuted,
                tabBarLabelStyle: {
                    ...TYPOGRAPHY.small,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Spirit"
                component={SpiritScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="moon" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Body"
                component={BodyScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="fitness" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color }) => (
                        <View style={{ marginTop: Platform.OS === 'ios' ? 0 : 0 }}>
                            <Ionicons name="home" size={32} color="white" />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),
                }}
            />
            <Tab.Screen
                name="Mind"
                component={MindScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bulb" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Wealth"
                component={WealthScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trending-up" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    customButtonContainer: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.large,
    },
    customButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.surface,
    },
});
