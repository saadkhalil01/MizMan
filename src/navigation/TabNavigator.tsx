import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BicepsFlexed, Brain, CircleDollarSign, Moon } from 'lucide-react-native';
import { TYPOGRAPHY, SHADOWS } from '../constants/theme';
import { TabParamList } from '../types';
import { useTheme } from '../context/ThemeContext';

// Screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import SpiritScreen from '../screens/Spirit/SpiritScreen';
import BodyScreen from '../screens/Body/BodyScreen';
import MindScreen from '../screens/Mind/MindScreen';
import WealthScreen from '../screens/Wealth/WealthScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBarButton = ({ children, onPress }: any) => {
    const { colors } = useTheme();
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
                    colors={colors.accentGradient}
                    style={[styles.customButton, { borderColor: colors.background }]}
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
    const { colors, isDark } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    backgroundColor: isDark ? 'rgba(26, 32, 56, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    borderTopWidth: 0,
                    height: 65,
                    borderRadius: 32.5,
                    paddingBottom: Platform.OS === 'ios' ? 15 : 8,
                    paddingTop: 14,
                    borderWidth: 1,
                    borderColor: colors.surfaceLight,
                    ...SHADOWS.large,
                    elevation: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Spirit"
                component={SpiritScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Moon size={28} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Body"
                component={BodyScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BicepsFlexed size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => (
                        <View style={{}}>
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
                    tabBarIcon: ({ color }) => (
                        <Brain size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Wealth"
                component={WealthScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CircleDollarSign size={28} color={color} />
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
    },
});
