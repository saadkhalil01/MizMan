import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Brain, Dumbbell, Moon, Sun } from 'lucide-react-native';
import { SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from '../../constants/theme';
import Svg, { Circle, G, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { LineChart, BarChart } from 'react-native-chart-kit';
import ScreenBackground from '../../components/common/ScreenBackground';
import { useTheme } from '../../context/ThemeContext';
import NationalityModal from '../../components/common/NationalityModal';

const { width } = Dimensions.get('window');

interface ModuleCardProps {
    title: string;
    icon: React.ReactNode;
    score: number;
    color: string;
    onPress: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, icon, score, color, onPress }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={[styles.moduleCard, { backgroundColor: colors.surface }]} activeOpacity={0.8}>
            <LinearGradient
                colors={[colors.surface, colors.surfaceLight]}
                style={styles.moduleGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                    {icon}
                </View>
                <Text style={[styles.moduleTitle, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.moduleScore, { color: colors.text }]}>{score}%</Text>
                <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
                    <View style={[styles.progressFill, { width: `${score}%`, backgroundColor: color }]} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const MasterRing: React.FC<{ score: number; size?: number }> = ({ score, size = 220 }) => {
    const { colors } = useTheme();
    const strokeWidth = size * 0.09;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = circumference - (score / 100) * circumference;

    return (
        <View style={styles.ringContainer}>
            <Svg width={size} height={size}>
                <Defs>
                    <SvgGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor={colors.accentGradient[0]} />
                        <Stop offset="50%" stopColor={colors.accentGradient[1]} />
                        <Stop offset="100%" stopColor={colors.accentGradient[2]} />
                    </SvgGradient>
                </Defs>
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    {/* Background Circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={colors.surfaceLight}
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
                <Text style={[styles.ringScore, { fontSize: size * 0.25, color: colors.text }]}>{score}</Text>
            </View>
        </View>
    );
};

export default function DashboardScreen() {
    const insets = useSafeAreaInsets();
    const { colors, toggleTheme, isDark } = useTheme();
    const [isNationalityModalVisible, setIsNationalityModalVisible] = useState(false);
    
    // Mock data - will be replaced with actual data from context
    const masterScore = 85;
    const modules = [
        { title: 'Spirit', icon: <Ionicons name="moon" size={24} color={isDark ? colors.spirit : '#854D0E'} />, score: 90, color: colors.spirit },
        { title: 'Body', icon: <Dumbbell size={24} color={isDark ? colors.body : '#92400E'} />, score: 75, color: colors.body },
        { title: 'Mind', icon: <Brain size={24} color={isDark ? colors.mind : '#0D9488'} />, score: 88, color: colors.mind },
        { title: 'Wealth', icon: <MaterialIcons name="attach-money" size={24} color={isDark ? colors.wealth : '#B45309'} />, score: 82, color: colors.wealth },
    ];

    return (
        <ScreenBackground style={styles.container}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + SPACING.xxl * 2 }
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top }]}>
                    <View>
                        <Text style={[styles.greeting, { color: colors.text }]}>Assalamu Alaikum</Text>
                        <Text style={[styles.date, { color: colors.textSecondary }]}>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </Text>
                    </View>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity 
                            style={[styles.notificationButton, { backgroundColor: colors.surface, marginRight: SPACING.sm }]}
                            onPress={() => setIsNationalityModalVisible(true)}
                        >
                            <Ionicons name="flag-outline" size={22} color={colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.notificationButton, { backgroundColor: colors.surface, marginRight: SPACING.sm }]}
                            onPress={toggleTheme}
                        >
                            {isDark ? (
                                <Ionicons name="sunny-outline" size={22} color={colors.text} />
                            ) : (
                                <Ionicons name="moon-outline" size={22} color={colors.text} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.notificationButton, { backgroundColor: colors.surface }]}>
                            <Ionicons name="notifications-outline" size={22} color={colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                <NationalityModal 
                    isVisible={isNationalityModalVisible} 
                    onClose={() => setIsNationalityModalVisible(false)} 
                />

                {/* Overview Row: Ring + Streak */}
                <View style={styles.overviewRow}>
                    <View style={styles.masterRingSectionCompact}>
                        <MasterRing score={masterScore} size={150} />
                    </View>
                    <View style={styles.highlightsColumn}>
                        <TouchableOpacity style={styles.streakHighlight}>
                            <LinearGradient
                                colors={colors.accentGradient}
                                style={styles.streakGradientSmall}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Ionicons name="flame" size={24} color={isDark ? colors.text : '#FFFFFF'} />
                                <View style={styles.streakInfoSmall}>
                                    <Text style={[styles.streakNumberSmall, { color: isDark ? colors.text : '#FFFFFF' }]}>24</Text>
                                    <Text style={[styles.highlightsLabel, { color: isDark ? colors.text : '#FFFFFF' }]}>Days</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={[styles.dailyQuoteCard, { backgroundColor: colors.surface, borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }]}>
                            <LinearGradient
                                colors={[colors.surfaceLight, colors.surface]}
                                style={StyleSheet.absoluteFill}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                            <Text style={[styles.quoteText, { color: colors.textSecondary }]}>"Balance is the key to MizMan."</Text>
                        </View>
                    </View>
                </View>

                {/* Compact Charts Section */}
                <View style={styles.chartsSection}>
                    {/* MizMan Index */}
                    <View style={[styles.chartCard, { backgroundColor: colors.surface, borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }]}>
                        <Text style={[styles.chartTitleCompact, { color: colors.textSecondary }]}>MizMan Index</Text>
                        <LineChart
                            data={{
                                labels: ["M", "T", "W", "T", "F", "S", "S"],
                                datasets: [{
                                    data: [65, 78, 82, 75, 90, 88, 85]
                                }]
                            }}
                            width={width - (SPACING.lg * 1.5) - (SPACING.md * 2)}
                            height={180}
                            yLabelsOffset={30}
                            xLabelsOffset={-5}

                            chartConfig={{
                                backgroundColor: colors.surface,
                                backgroundGradientFrom: colors.surface,
                                backgroundGradientTo: colors.surface,
                                decimalPlaces: 0,
                                color: (opacity = 1) => isDark ? `rgba(52, 211, 153, ${opacity})` : `rgba(16, 185, 129, ${opacity})`,
                                labelColor: (opacity = 1) => isDark ? `rgba(180, 198, 231, ${opacity})` : `rgba(71, 85, 105, ${opacity})`,
                                propsForDots: {
                                    r: "2",
                                    strokeWidth: "3",
                                    stroke: colors.success
                                },
                                propsForBackgroundLines: {
                                    strokeDasharray: "", // solid background lines
                                    stroke: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                                },
                                fillShadowGradient: colors.success,
                                fillShadowGradientOpacity: 0.2,
                                useShadowColorFromDataset: false,
                            }}
                            bezier
                            style={styles.chartInner}
                            withInnerLines={false}
                            withOuterLines={false}
                            withVerticalLines={false}
                            withHorizontalLines={true}
                            segments={4}
                            formatYLabel={(y) => `${Math.round(Number(y))}`}
                        />
                    </View>

                    {/* Pillar Balance */}
                    <View style={[styles.chartCard, { backgroundColor: colors.surface, borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }]}>
                        <Text style={[styles.chartTitleCompact, { color: colors.textSecondary }]}>Pillar Balance</Text>
                        <BarChart
                            data={{
                                labels: ["S", "B", "M", "W"],
                                datasets: [{
                                    data: [90, 75, 88, 82],
                                    colors: [
                                        (opacity = 1) => isDark ? `rgba(254, 249, 195, ${opacity})` : `rgba(133, 77, 14, ${opacity})`,
                                        (opacity = 1) => isDark ? `rgba(253, 230, 138, ${opacity})` : `rgba(146, 64, 14, ${opacity})`,
                                        (opacity = 1) => isDark ? `rgba(94, 221, 212, ${opacity})` : `rgba(13, 148, 136, ${opacity})`,
                                        (opacity = 1) => isDark ? `rgba(245, 158, 11, ${opacity})` : `rgba(180, 83, 9, ${opacity})`,
                                    ]
                                }]
                            }}
                            width={width - (SPACING.lg * 1.5) - (SPACING.md * 2)}
                            height={180}
                            yAxisLabel=""
                            yAxisSuffix="%"
                            yLabelsOffset={30}
                            xLabelsOffset={-5}
                            chartConfig={{
                                backgroundColor: colors.surface,
                                backgroundGradientFrom: colors.surface,
                                backgroundGradientTo: colors.surface,
                                decimalPlaces: 0,
                                color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(15, 23, 42, ${opacity})`,
                                labelColor: (opacity = 1) => isDark ? `rgba(180, 198, 231, ${opacity})` : `rgba(71, 85, 105, ${opacity})`,
                                barPercentage: 1,
                                barRadius: 5,
                                propsForBackgroundLines: {
                                    strokeDasharray: "",
                                    stroke: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                                },
                            }}
                            style={styles.chartInner}
                            fromZero
                            withInnerLines={false}
                            showBarTops={false}
                            segments={4}
                            withCustomBarColorFromData={true}
                            flatColor={true}
                        />
                    </View>
                </View>

                {/* Module Cards */}
                <View style={styles.modulesSectionCompact}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitleSmall, { color: colors.text }]}>Your Pillars</Text>
                        <TouchableOpacity>
                            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
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
                            colors={colors.accentGradient}
                            style={styles.actionGradientCompact}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Ionicons name="add" size={24} color={isDark ? colors.text : '#FFFFFF'} />
                            <Text style={[styles.actionTextCompact, { color: isDark ? colors.text : '#FFFFFF' }]}>Log Entry</Text>
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
        paddingBottom: SPACING.xxl * 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeting: {
        ...TYPOGRAPHY.h2,
    },
    date: {
        ...TYPOGRAPHY.caption,
        marginTop: SPACING.xs,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
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
        top: '39%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ringScore: {
        fontFamily: 'Inter-SemiBold',
        fontWeight: '600',
    },
    ringLabel: {
        ...TYPOGRAPHY.caption,
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
    },
    streakLabel: {
        ...TYPOGRAPHY.caption,
        opacity: 0.8,
    },
    modulesSection: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h3,
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
        marginBottom: SPACING.xs,
    },
    moduleScore: {
        ...TYPOGRAPHY.h2,
        marginBottom: SPACING.sm,
    },
    progressBar: {
        height: 6,
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
    },
    highlightsLabel: {
        ...TYPOGRAPHY.small,
        opacity: 0.8,
    },
    dailyQuoteCard: {
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    quoteText: {
        ...TYPOGRAPHY.smallMedium,
        fontStyle: 'italic',
    },
    chartsSection: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    },
    chartCard: {
        borderRadius: BORDER_RADIUS.lg,
        height: 240,
        borderWidth: 1,
        ...SHADOWS.small,
        justifyContent: 'center'
    },
    chartTitleCompact: {
        ...TYPOGRAPHY.h3,
        marginLeft: SPACING.sm + 10,
        marginBottom: SPACING.sm,
    },
    chartInner: {
        borderRadius: BORDER_RADIUS.md,
        alignSelf: 'center',
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
    },
    viewAllText: {
        ...TYPOGRAPHY.smallMedium,
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
    },
});
