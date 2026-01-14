import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../constants/theme';
import { TabParamList } from '../types';

// Screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import SpiritScreen from '../screens/Spirit/SpiritScreen';
import BodyScreen from '../screens/Body/BodyScreen';
import MindScreen from '../screens/Mind/MindScreen';
import WealthScreen from '../screens/Wealth/WealthScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBarButton = ({ children, onPress }: any) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            style={styles.customButtonContainer}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
        >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <LinearGradient
                    colors={COLORS.accentGradient}
                    style={styles.customButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    {children}
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

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
                    backgroundColor: 'rgba(26, 32, 56, 0.95)', // Lighter translucent surface
                    borderTopWidth: 0,
                    height: 70,
                    borderRadius: 35,
                    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
                    paddingTop: 10,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    ...SHADOWS.large,
                    elevation: 8,
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textMuted,
                tabBarLabelStyle: {
                    ...TYPOGRAPHY.smallMedium,
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
                        <View style={{ marginTop: 8 }}>
                            <Ionicons name="home" size={26} color="white" />
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
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.large,
    },
    customButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.background, // Match the gap to background
    },
});
