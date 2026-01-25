import React from 'react';
import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

interface ScreenBackgroundProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

const ScreenBackground: React.FC<ScreenBackgroundProps> = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            <StatusBar style="light" />
            {/* Base Gradient */}
            <LinearGradient
                colors={COLORS.premiumGradient}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Decorative Blobs for Depth */}
            <View style={styles.blobContainer}>
                <LinearGradient
                    colors={['rgba(124, 112, 255, 0.2)', 'transparent']}
                    style={[styles.blob, styles.blobTopLeft]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
                <LinearGradient
                    colors={['rgba(244, 114, 182, 0.15)', 'transparent']}
                    style={[styles.blob, styles.blobBottomRight]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                />
                <LinearGradient
                    colors={['rgba(183, 148, 246, 0.18)', 'transparent']}
                    style={[styles.blob, styles.blobCenter]}
                    start={{ x: 0.5, y: 0.5 }}
                    end={{ x: 0, y: 0 }}
                />
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
    },
    blobContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    blob: {
        position: 'absolute',
        borderRadius: 1000,
    },
    blobTopLeft: {
        width: width * 0.8,
        height: width * 0.8,
        top: -width * 0.2,
        left: -width * 0.2,
        opacity: 0.7,
    },
    blobBottomRight: {
        width: width * 0.7,
        height: width * 0.7,
        bottom: -width * 0.1,
        right: -width * 0.2,
        opacity: 0.6,
    },
    blobCenter: {
        width: width * 0.6,
        height: width * 0.6,
        top: height * 0.3,
        right: -width * 0.1,
        opacity: 0.5,
    },
});

export default ScreenBackground;
