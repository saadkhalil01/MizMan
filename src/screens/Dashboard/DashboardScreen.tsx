import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from '../../constants/theme';
import Svg, { Circle, G, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import ScreenBackground from '../../components/common/ScreenBackground';

const { width } = Dimensions.get('window');

interface ModuleCardProps {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    score: number;
    color: string;
    onPress: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, icon, score, color, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.moduleCard} activeOpacity={0.8}>
            <LinearGradient
                colors={[COLORS.surface, COLORS.surfaceLight]}
                style={styles.moduleGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                    <Ionicons name={icon} size={28} color={color} />
                </View>
                <Text style={styles.moduleTitle}>{title}</Text>
                <Text style={styles.moduleScore}>{score}%</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${score}%`, backgroundColor: color }]} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const MasterRing: React.FC<{ score: number }> = ({ score }) => {
    const size = 220;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = circumference - (score / 100) * circumference;

    return (
        <View style={styles.ringContainer}>
            <Svg width={size} height={size}>
                <Defs>
                    <SvgGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor={COLORS.accentGradient[0]} />
                        <Stop offset="50%" stopColor={COLORS.accentGradient[1]} />
                        <Stop offset="100%" stopColor={COLORS.accentGradient[2]} />
                    </SvgGradient>
                </Defs>
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    {/* Background Circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={COLORS.surfaceLight}
                        strokeWidth={strokeWidth}
                        fill="none"
                        opacity={0.3}
                    />
                    {/* Progress Circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
            <View style={styles.ringCenter}>
                <Text style={styles.ringScore}>{score}%</Text>
                <Text style={styles.ringLabel}>Master Score</Text>
            </View>
        </View>
    );
};

export default function DashboardScreen() {
    // Mock data - will be replaced with actual data from context
    const masterScore = 85;
    const modules = [
        { title: 'Spirit', icon: 'moon' as const, score: 90, color: COLORS.spirit },
        { title: 'Body', icon: 'fitness' as const, score: 75, color: COLORS.body },
        { title: 'Mind', icon: 'bulb' as const, score: 88, color: COLORS.mind },
        { title: 'Wealth', icon: 'trending-up' as const, score: 82, color: COLORS.wealth },
    ];

    return (
        <ScreenBackground style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Assalamu Alaikum</Text>
                        <Text style={styles.date}>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                </View>

                {/* Master Ring */}
                <View style={styles.masterRingSection}>
                    <MasterRing score={masterScore} />
                    <Text style={styles.masterRingSubtext}>
                        You're in the top 15% of users
                    </Text>
                </View>

                {/* Current Streak */}
                <View style={styles.streakCard}>
                    <LinearGradient
                        colors={COLORS.accentGradient}
                        style={styles.streakGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="flame" size={32} color={COLORS.text} />
                        <View style={styles.streakInfo}>
                            <Text style={styles.streakNumber}>24</Text>
                            <Text style={styles.streakLabel}>Day Streak</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color={COLORS.text} />
                    </LinearGradient>
                </View>

                {/* Module Cards */}
                <View style={styles.modulesSection}>
                    <Text style={styles.sectionTitle}>Your Pillars</Text>
                    <View style={styles.modulesGrid}>
                        {modules.map((module, index) => (
                            <ModuleCard
                                key={index}
                                title={module.title}
                                icon={module.icon}
                                score={module.score}
                                color={module.color}
                                onPress={() => console.log(`Navigate to ${module.title}`)}
                            />
                        ))}
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <TouchableOpacity style={styles.actionButton}>
                        <LinearGradient
                            colors={[COLORS.surface, COLORS.surfaceLight]}
                            style={styles.actionGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name="add-circle" size={24} color={COLORS.primary} />
                            <Text style={styles.actionText}>Log Today's Progress</Text>
                            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: SPACING.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xxl + 20,
        paddingBottom: SPACING.lg,
    },
    greeting: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
    },
    date: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    masterRingSection: {
        alignItems: 'center',
        paddingVertical: SPACING.xl,
    },
    ringContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ringCenter: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ringScore: {
        fontSize: 36,
        lineHeight: 48,
        color: COLORS.text,
        fontFamily: 'PressStart2P',
        fontWeight: '400',
    },
    ringLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    masterRingSubtext: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textMuted,
        marginTop: SPACING.md,
    },
    streakCard: {
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    streakGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    streakInfo: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    streakNumber: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
    },
    streakLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.text,
        opacity: 0.8,
    },
    modulesSection: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
        marginBottom: SPACING.md,
    },
    modulesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    moduleCard: {
        width: (width - SPACING.lg * 3) / 2,
        marginBottom: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        ...SHADOWS.medium,
    },
    moduleGradient: {
        padding: SPACING.md,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    moduleTitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    moduleScore: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },
    progressBar: {
        height: 6,
        backgroundColor: COLORS.background,
        borderRadius: BORDER_RADIUS.sm,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: BORDER_RADIUS.sm,
    },
    quickActions: {
        paddingHorizontal: SPACING.lg,
    },
    actionButton: {
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        ...SHADOWS.small,
    },
    actionGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    actionText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text,
        flex: 1,
        marginLeft: SPACING.md,
    },
});
