// FullReport.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, Dimensions,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';

import { BarChart, LineChart } from 'react-native-gifted-charts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

/* -------------------- sample data -------------------- */

const ACADEMIC_HISTORY = [
  {
    year: '2025/2026',
    class: 'Form 3 A',
    average: 84,
    rank: 2,
    outOf: 42,
    attendance: 96,
    status: 'current',
    terms: [
      {
        term: 'Term 1',
        average: 82,
        attendance: 94,
        rank: 3,
        grades: [
          { subject: 'Math',      grade: 'A-', score: 88 },
          { subject: 'English',   grade: 'B+', score: 82 },
          { subject: 'Biology',   grade: 'A',  score: 91 },
          { subject: 'Chemistry', grade: 'B',  score: 78 },
          { subject: 'History',   grade: 'B+', score: 84 },
          { subject: 'Geography', grade: 'B-', score: 74 },
        ],
      },
      {
        term: 'Term 2',
        average: 86,
        attendance: 97,
        rank: 2,
        grades: [
          { subject: 'Math',      grade: 'A',  score: 92 },
          { subject: 'English',   grade: 'B+', score: 84 },
          { subject: 'Biology',   grade: 'A',  score: 94 },
          { subject: 'Chemistry', grade: 'B+', score: 81 },
          { subject: 'History',   grade: 'B',  score: 79 },
          { subject: 'Geography', grade: 'B',  score: 77 },
        ],
      },
      {
        term: 'Term 3',
        average: null,
        attendance: null,
        rank: null,
        grades: null,
        status: 'in-progress',
      },
    ],
  },
  {
    year: '2024/2025',
    class: 'Form 2 A',
    average: 79,
    rank: 5,
    outOf: 40,
    attendance: 92,
    status: 'complete',
    terms: [
      {
        term: 'Term 1',
        average: 76,
        attendance: 90,
        rank: 7,
        grades: [
          { subject: 'Math',      grade: 'B',  score: 74 },
          { subject: 'English',   grade: 'B+', score: 81 },
          { subject: 'Biology',   grade: 'B',  score: 78 },
          { subject: 'Chemistry', grade: 'C+', score: 68 },
          { subject: 'History',   grade: 'B',  score: 76 },
          { subject: 'Geography', grade: 'B-', score: 73 },
        ],
      },
      {
        term: 'Term 2',
        average: 80,
        attendance: 93,
        rank: 4,
        grades: [
          { subject: 'Math',      grade: 'B+', score: 83 },
          { subject: 'English',   grade: 'B+', score: 85 },
          { subject: 'Biology',   grade: 'A-', score: 88 },
          { subject: 'Chemistry', grade: 'B',  score: 75 },
          { subject: 'History',   grade: 'B+', score: 82 },
          { subject: 'Geography', grade: 'B',  score: 76 },
        ],
      },
      {
        term: 'Term 3',
        average: 81,
        attendance: 94,
        rank: 3,
        grades: [
          { subject: 'Math',      grade: 'A-', score: 87 },
          { subject: 'English',   grade: 'B+', score: 84 },
          { subject: 'Biology',   grade: 'A',  score: 90 },
          { subject: 'Chemistry', grade: 'B',  score: 78 },
          { subject: 'History',   grade: 'B+', score: 83 },
          { subject: 'Geography', grade: 'B',  score: 77 },
        ],
      },
    ],
  },
  {
    year: '2023/2024',
    class: 'Form 1 A',
    average: 74,
    rank: 9,
    outOf: 38,
    attendance: 88,
    status: 'complete',
    terms: [
      {
        term: 'Term 1',
        average: 70,
        attendance: 85,
        rank: 12,
        grades: [
          { subject: 'Math',      grade: 'B-', score: 71 },
          { subject: 'English',   grade: 'B',  score: 74 },
          { subject: 'Biology',   grade: 'B-', score: 72 },
          { subject: 'Chemistry', grade: 'C+', score: 65 },
          { subject: 'History',   grade: 'B-', score: 70 },
          { subject: 'Geography', grade: 'C+', score: 68 },
        ],
      },
      {
        term: 'Term 2',
        average: 74,
        attendance: 88,
        rank: 9,
        grades: [
          { subject: 'Math',      grade: 'B',  score: 75 },
          { subject: 'English',   grade: 'B',  score: 76 },
          { subject: 'Biology',   grade: 'B',  score: 78 },
          { subject: 'Chemistry', grade: 'C+', score: 68 },
          { subject: 'History',   grade: 'B',  score: 72 },
          { subject: 'Geography', grade: 'B-', score: 71 },
        ],
      },
      {
        term: 'Term 3',
        average: 78,
        attendance: 91,
        rank: 6,
        grades: [
          { subject: 'Math',      grade: 'B+', score: 82 },
          { subject: 'English',   grade: 'B+', score: 83 },
          { subject: 'Biology',   grade: 'B+', score: 85 },
          { subject: 'Chemistry', grade: 'B',  score: 74 },
          { subject: 'History',   grade: 'B+', score: 80 },
          { subject: 'Geography', grade: 'B',  score: 77 },
        ],
      },
    ],
  },
];

/* -------------------- helpers -------------------- */

function gradeColor(score, colors) {
  if (score == null) return colors.fgMuted;
  if (score >= 85) return colors.accent;
  if (score >= 70) return colors.fg;
  return colors.fgMuted;
}

/* -------------------- chart components -------------------- */

function YearBarChart({ data, colors }) {
  const styles = makeStyles(colors);

  const barData = data.map((item) => ({
    value: item.average ?? 0,
    label: item.year.slice(0, 4),
    frontColor: item.status === 'current' ? colors.accent : colors.fgMuted,
    topLabelComponent: () => (
      <Text style={styles.barTopLabel}>{item.average ?? '—'}</Text>
    ),
  }));

  return (
    <View style={styles.chartWrap}>
      <BarChart
        data={barData}
        width={screenWidth - 88}
        height={160}
        barWidth={38}
        noOfSections={4}
        maxValue={100}
        yAxisThickness={0}
        xAxisThickness={1}
        xAxisColor={colors.border}
        yAxisTextStyle={{
          color: colors.fgMuted,
          fontSize: 9,
          fontFamily: 'monospace',
        }}
        xAxisLabelTextStyle={{
          color: colors.fgMuted,
          fontSize: 9,
          fontFamily: 'monospace',
        }}
        hideRules
        isAnimated
        animationDuration={600}
        barBorderRadius={2}
        rulesColor={colors.border}
        yAxisLabelSuffix="%"
        yAxisLabelWidth={30}
        disablePress
      />
    </View>
  );
}

function TermTrendLine({ terms, colors }) {
  const styles = makeStyles(colors);
  const valid = terms.filter((t) => t.average != null);

  if (valid.length < 2) {
    return (
      <Text style={styles.sparkEmpty}>
        Not enough data to chart yet.
      </Text>
    );
  }

  const lineData = valid.map((t) => ({
    value: t.average,
    label: t.term.replace('Term ', 'T'),
    dataPointText: String(t.average),
  }));

  return (
    <View style={styles.termChartWrap}>
      <LineChart
        data={lineData}
        width={screenWidth - 120}
        height={100}
        color={colors.accent}
        thickness={2}
        curved
        areaChart
        startFillColor={colors.accent}
        startOpacity={0.15}
        endFillColor={colors.accent}
        endOpacity={0.01}
        yAxisThickness={0}
        xAxisThickness={1}
        xAxisColor={colors.border}
        yAxisTextStyle={{
          color: colors.fgMuted,
          fontSize: 9,
          fontFamily: 'monospace',
        }}
        xAxisLabelTextStyle={{
          color: colors.fgMuted,
          fontSize: 9,
          fontFamily: 'monospace',
        }}
        hideDataPoints={false}
        dataPointsColor={colors.accent}
        dataPointsRadius={3}
        textColor={colors.fg}
        textFontSize={9}
        textShiftY={-8}
        textShiftX={-8}
        maxValue={100}
        noOfSections={3}
        yAxisLabelSuffix="%"
        yAxisLabelWidth={30}
        disablePress
        isAnimated
        animationDuration={600}
      />
    </View>
  );
}

function TermGradesLine({ grades, colors }) {
  if (!grades?.length) return null;

  const data = grades.map((g) => ({
    value: g.score,
    label: g.subject.slice(0, 3),
  }));

  return (
    <LineChart
      data={data}
      width={screenWidth - 120}
      height={70}
      color={colors.accent}
      thickness={1.5}
      curved
      yAxisThickness={0}
      xAxisThickness={0}
      hideYAxisText
      hideDataPoints={false}
      dataPointsColor={colors.accent}
      dataPointsRadius={2}
      xAxisLabelTextStyle={{
        color: colors.fgFaint,
        fontSize: 7,
        fontFamily: 'monospace',
      }}
      maxValue={100}
      noOfSections={2}
      disablePress
      initialSpacing={12}
      endSpacing={12}
    />
  );
}

/* -------------------- UI components -------------------- */

function SummaryStat({ value, label, sub, accent, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={[styles.summaryTile, accent && styles.summaryTileAccent]}>
      <Text style={[styles.summaryValue, accent && styles.summaryValueAccent]}>
        {value}
      </Text>
      <Text style={styles.summaryLabel}>{label}</Text>
      {sub ? <Text style={styles.summarySub}>{sub}</Text> : null}
    </View>
  );
}

function GradeRow({ grade, colors }) {
  const styles = makeStyles(colors);
  const tint = gradeColor(grade.score, colors);
  return (
    <View style={styles.gradeRow}>
      <Text style={styles.gradeSubject} numberOfLines={1}>
        {grade.subject}
      </Text>
      <Text style={[styles.gradeScore, { color: tint }]}>
        {grade.score}%
      </Text>
      <Text style={styles.gradeLetter}>{grade.grade}</Text>
    </View>
  );
}

function TermBlock({ term, colors }) {
  const styles = makeStyles(colors);
  const inProgress = term.status === 'in-progress';

  return (
    <View style={styles.termBlock}>
      <View style={styles.termHeader}>
        <Text style={styles.termName}>{term.term}</Text>
        {inProgress ? (
          <View style={styles.termPillInProgress}>
            <Text style={styles.termPillInProgressText}>IN PROGRESS</Text>
          </View>
        ) : (
          <Text style={styles.termAverage}>{term.average}%</Text>
        )}
      </View>

      {!inProgress && (
        <>
          <View style={styles.termStatsRow}>
            <View style={styles.termStat}>
              <Text style={styles.termStatValue}>{term.attendance}%</Text>
              <Text style={styles.termStatLabel}>ATT</Text>
            </View>
            <View style={styles.termStat}>
              <Text style={styles.termStatValue}>#{term.rank}</Text>
              <Text style={styles.termStatLabel}>RANK</Text>
            </View>
          </View>

          {term.grades && (
            <TermGradesLine grades={term.grades} colors={colors} />
          )}

          <View style={styles.gradesList}>
            {term.grades?.map((g, i) => (
              <GradeRow key={i} grade={g} colors={colors} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

function YearBlock({ year, expanded, onToggle, colors }) {
  const styles = makeStyles(colors);
  const isCurrent = year.status === 'current';

  return (
    <View style={styles.yearBlock}>
      <TouchableOpacity
        style={styles.yearHeader}
        onPress={onToggle}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={`${year.year}, ${year.class}`}
      >
        <View style={styles.yearHeaderLeft}>
          <Text style={styles.yearTitle}>{year.year}</Text>
          <Text style={styles.yearClass}>{year.class}</Text>
        </View>
        <View style={styles.yearHeaderRight}>
          {isCurrent ? (
            <View style={styles.currentPill}>
              <Text style={styles.currentPillText}>CURRENT</Text>
            </View>
          ) : (
            <Text style={styles.yearAverage}>{year.average}%</Text>
          )}
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={colors.fgMuted}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.yearBody}>
          <View style={styles.yearStatsRow}>
            <View style={styles.yearStat}>
              <Text style={styles.yearStatValue}>{year.average}%</Text>
              <Text style={styles.yearStatLabel}>AVERAGE</Text>
            </View>
            <View style={styles.yearStat}>
              <Text style={styles.yearStatValue}>
                #{year.rank}/{year.outOf}
              </Text>
              <Text style={styles.yearStatLabel}>RANK</Text>
            </View>
            <View style={styles.yearStat}>
              <Text style={styles.yearStatValue}>{year.attendance}%</Text>
              <Text style={styles.yearStatLabel}>ATTENDANCE</Text>
            </View>
          </View>

          <Text style={styles.subLabel}>TERM TREND</Text>
          <TermTrendLine terms={year.terms} colors={colors} />

          <Text style={styles.subLabel}>TERMS</Text>
          {year.terms.map((t) => (
            <TermBlock key={t.term} term={t} colors={colors} />
          ))}
        </View>
      )}
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function FullReport({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [expandedYear, setExpandedYear] = useState('2025/2026');

  const current = ACADEMIC_HISTORY.find((y) => y.status === 'current');

  const summary = useMemo(() => {
    const completed = ACADEMIC_HISTORY.filter((y) => y.average != null);
    const cumulativeAvg = Math.round(
      completed.reduce((s, y) => s + y.average, 0) / Math.max(1, completed.length)
    );
    const bestTerm = ACADEMIC_HISTORY
      .flatMap((y) => y.terms)
      .filter((t) => t.average != null)
      .reduce((best, t) => (best && best.average >= t.average ? best : t), null);
    return { cumulativeAvg, bestTerm };
  }, []);

  const onExport = () => {
    Alert.alert(
      'Export report',
      'A PDF copy will be generated and emailed to you.'
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FULL ACADEMIC REPORT</Text>
          <TouchableOpacity onPress={onExport} hitSlop={8}>
            <Ionicons name="download-outline" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== SUMMARY ===== */}
          <View style={styles.summaryRow}>
            <SummaryStat
              value={`${summary.cumulativeAvg}%`}
              label="CUMULATIVE"
              sub="all years"
              accent
              colors={colors}
            />
            <SummaryStat
              value={`${current?.average ?? '—'}%`}
              label="CURRENT"
              sub={current?.class}
              colors={colors}
            />
            <SummaryStat
              value={`#${current?.rank ?? '—'}`}
              label="RANK"
              sub={`of ${current?.outOf ?? '—'}`}
              colors={colors}
            />
            <SummaryStat
              value={`${current?.attendance ?? '—'}%`}
              label="ATTENDANCE"
              colors={colors}
            />
          </View>

          {/* ===== YEAR TREND ===== */}
          <Text style={styles.sectionTitle}>AVERAGE BY YEAR</Text>
          <View style={styles.chartBlock}>
            <YearBarChart data={ACADEMIC_HISTORY} colors={colors} />
            <View style={styles.chartLegend}>
              <View style={styles.chartLegendItem}>
                <View
                  style={[
                    styles.chartLegendDot,
                    { backgroundColor: colors.accent },
                  ]}
                />
                <Text style={styles.chartLegendText}>Current year</Text>
              </View>
              <View style={styles.chartLegendItem}>
                <View
                  style={[
                    styles.chartLegendDot,
                    { backgroundColor: colors.fgMuted },
                  ]}
                />
                <Text style={styles.chartLegendText}>Previous</Text>
              </View>
            </View>
          </View>

          {/* ===== BEST TERM ===== */}
          {summary.bestTerm && (
            <View style={styles.bestTermCard}>
              <Ionicons name="trophy-outline" size={20} color={colors.accent} />
              <View style={{ flex: 1 }}>
                <Text style={styles.bestTermLabel}>BEST TERM</Text>
                <Text style={styles.bestTermText}>
                  {summary.bestTerm.term} · {summary.bestTerm.average}%
                </Text>
              </View>
            </View>
          )}

          {/* ===== YEARS ===== */}
          <Text style={styles.sectionTitle}>BY YEAR</Text>
          {ACADEMIC_HISTORY.map((y) => (
            <YearBlock
              key={y.year}
              year={y}
              expanded={expandedYear === y.year}
              onToggle={() =>
                setExpandedYear((cur) => (cur === y.year ? null : y.year))
              }
              colors={colors}
            />
          ))}

          {/* ===== FOOTNOTE ===== */}
          <View style={styles.noteBlock}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color={colors.fgMuted}
            />
            <Text style={styles.noteText}>
              Report generated from the school's records. Contact the school
              office if any figures look incorrect.
            </Text>
          </View>

          {/* ===== EXPORT ===== */}
          <TouchableOpacity
            style={styles.exportBtn}
            onPress={onExport}
            activeOpacity={0.7}
          >
            <Ionicons
              name="download-outline"
              size={16}
              color={colors.buttonFg}
            />
            <Text style={styles.exportBtnText}>
              DOWNLOAD FULL REPORT (PDF)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}