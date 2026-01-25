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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Brain, Dumbbell } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from '../../constants/theme';
import Svg, { Circle, G, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { LineChart, BarChart } from 'react-native-chart-kit';
import ScreenBackground from '../../components/common/ScreenBackground';

const { width } = Dimensions.get('window');

interface ModuleCardProps {
    title: string;
    icon: React.ReactNode;
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
                    {icon}
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

const MasterRing: React.FC<{ score: number; size?: number }> = ({ score, size = 220 }) => {
    const strokeWidth = size * 0.09;
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
                <Text style={[styles.ringScore, { fontSize: size * 0.18 }]}>{score}</Text>
            </View>
        </View>
    );
};

export default function DashboardScreen() {
    // Mock data - will be replaced with actual data from context
    const masterScore = 85;
    const modules = [
        { title: 'Spirit', icon: <Ionicons name="moon" size={24} color={COLORS.spirit} />, score: 90, color: COLORS.spirit },
        { title: 'Body', icon: <Dumbbell size={24} color={COLORS.body} />, score: 75, color: COLORS.body },
        { title: 'Mind', icon: <Brain size={24} color={COLORS.mind} />, score: 88, color: COLORS.mind },
        { title: 'Wealth', icon: <MaterialIcons name="attach-money" size={24} color={COLORS.wealth} />, score: 82, color: COLORS.wealth },
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
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
                    </TouchableOpacity>
                </View>

                {/* Overview Row: Ring + Streak */}
                <View style={styles.overviewRow}>
                    <View style={styles.masterRingSectionCompact}>
                        <MasterRing score={masterScore} size={150} />
                    </View>
                    <View style={styles.highlightsColumn}>
                        <TouchableOpacity style={styles.streakHighlight}>
                            <LinearGradient
                                colors={COLORS.accentGradient}
                                style={styles.streakGradientSmall}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Ionicons name="flame" size={24} color={COLORS.text} />
                                <View style={styles.streakInfoSmall}>
                                    <Text style={styles.streakNumberSmall}>24</Text>
                                    <Text style={styles.highlightsLabel}>Days</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dailyQuoteCard}>
                            <Text style={styles.quoteText}>"Balance is the key to Mizaan."</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Compact Charts Section */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.chartsCarousel}
                    contentContainerStyle={styles.chartsCarouselContent}
                >
                    {/* Mizaan Index */}
                    <View style={styles.chartCardCompact}>
                        <Text style={styles.chartTitleCompact}>Mizaan Index</Text>
                        <LineChart
                            data={{
                                labels: ["M", "T", "W", "T", "F", "S", "S"],
                                datasets: [{ data: [65, 78, 82, 75, 90, 88, 85] }]
                            }}
                            width={width * 0.75}
                            height={160}
                            chartConfig={{
                                backgroundColor: COLORS.surface,
                                backgroundGradientFrom: COLORS.surface,
                                backgroundGradientTo: COLORS.surfaceLight,
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(139, 127, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(180, 198, 231, ${opacity})`,
                                propsForDots: { r: "3", strokeWidth: "2", stroke: COLORS.primary },
                            }}
                            bezier
                            style={styles.chartInner}
                            withInnerLines={false}
                            withOuterLines={false}
                        />
                    </View>

                    {/* Pillar Balance */}
                    <View style={styles.chartCardCompact}>
                        <Text style={styles.chartTitleCompact}>Pillar Balance</Text>
                        <BarChart
                            data={{
                                labels: ["S", "B", "M", "W"],
                                datasets: [{ data: [90, 75, 88, 82] }]
                            }}
                            width={width * 0.75}
                            height={160}
                            yAxisLabel=""
                            yAxisSuffix="%"
                            chartConfig={{
                                backgroundColor: COLORS.surface,
                                backgroundGradientFrom: COLORS.surface,
                                backgroundGradientTo: COLORS.surfaceLight,
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(179, 157, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(180, 198, 231, ${opacity})`,
                            }}
                            style={styles.chartInner}
                            fromZero
                            withInnerLines={false}
                        />
                    </View>
                </ScrollView>

                {/* Module Cards */}
                <View style={styles.modulesSectionCompact}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitleSmall}>Your Pillars</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
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

                {/* Quick Action Button - Floating Style-ish */}
                <View style={[styles.quickActions, { marginBottom: SPACING.lg }]}>
                    <TouchableOpacity style={styles.actionButtonCompact}>
                        <LinearGradient
                            colors={COLORS.accentGradient}
                            style={styles.actionGradientCompact}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Ionicons name="add" size={24} color={COLORS.text} />
                            <Text style={styles.actionTextCompact}>Log Entry</Text>
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
    chartSection: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    chartContainer: {
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        ...SHADOWS.medium,
        backgroundColor: COLORS.surface,
    },
    overviewRow: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.lg,
    },
    masterRingSectionCompact: {
        flex: 1,
        alignItems: 'flex-start',
    },
    highlightsColumn: {
        flex: 1,
        marginLeft: SPACING.md,
        gap: SPACING.sm,
    },
    streakHighlight: {
        borderRadius: BORDER_RADIUS.md,
        overflow: 'hidden',
        ...SHADOWS.small,
    },
    streakGradientSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        gap: SPACING.sm,
    },
    streakInfoSmall: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 2,
    },
    streakNumberSmall: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
    },
    highlightsLabel: {
        ...TYPOGRAPHY.small,
        color: COLORS.text,
        opacity: 0.8,
    },
    dailyQuoteCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    quoteText: {
        ...TYPOGRAPHY.smallMedium,
        color: COLORS.textSecondary,
        fontStyle: 'italic',
    },
    chartsCarousel: {
        marginBottom: SPACING.lg,
    },
    chartsCarouselContent: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
    },
    chartCardCompact: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        ...SHADOWS.small,
    },
    chartTitleCompact: {
        ...TYPOGRAPHY.h3,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
    },
    chartInner: {
        borderRadius: BORDER_RADIUS.md,
    },
    modulesSectionCompact: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    sectionTitleSmall: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
    },
    viewAllText: {
        ...TYPOGRAPHY.smallMedium,
        color: COLORS.primary,
    },
    actionButtonCompact: {
        borderRadius: BORDER_RADIUS.full,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    actionGradientCompact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        gap: SPACING.sm,
    },
    actionTextCompact: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.text,
    },
});
