// src/pages/teachers/tasks/task-detail/index.jsx
import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, Modal,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import OverviewTab from './overview/index.jsx';
import SubmissionsTab from './submissions/index.jsx';
import RubricTab from './rubric/index.jsx';
import SubmissionDetailView from './submission-detail/index.jsx';

/* -------------------- fallback + normalize -------------------- */

const FALLBACK_TASK = {
  id: 'default', title: 'Task', className: '—', dueAt: '—',
  points: 0, status: 'published', mode: 'file',
  instructions: '', attachments: [], rubric: [], questions: [],
  stats: { submitted: 0, total: 0, graded: 0, flagged: 0, meanGrade: null, autoGraded: 0 },
};

function normalizeTask(raw) {
  if (!raw) return FALLBACK_TASK;
  const hasStats = raw.stats && typeof raw.stats === 'object';
  const stats = {
    submitted: hasStats ? raw.stats.submitted ?? 0 : raw.submitted ?? 0,
    total:     hasStats ? raw.stats.total     ?? 0 : raw.total     ?? 0,
    graded:    hasStats ? raw.stats.graded    ?? 0 : raw.graded    ?? 0,
    flagged:   hasStats ? raw.stats.flagged   ?? 0 : raw.flagged   ?? 0,
    meanGrade: hasStats ? raw.stats.meanGrade ?? null : raw.meanGrade ?? null,
    autoGraded: hasStats ? raw.stats.autoGraded ?? 0 : raw.autoGraded ?? 0,
  };
  return {
    ...FALLBACK_TASK, ...raw, stats,
    attachments: raw.attachments ?? [],
    rubric:      raw.rubric      ?? [],
    questions:   raw.questions   ?? [],
  };
}

const INITIAL_SUBMISSIONS = [
  { id: 's1', student: 'Amina Wanjiku', submittedAt: 'Today, 3:48 PM', status: 'submitted', onTime: true, autoGrade: 84,
    fileName: 'lab_report_amina.pdf', fileSize: '2.4 MB',
    answers: [
      { questionId: 'q1', value: 'b', correct: true,  pointsEarned: 5 },
      { questionId: 'q2', value: 'Water moving through a membrane.', correct: false, pointsEarned: 4 },
      { questionId: 'q3', value: 'b', correct: true,  pointsEarned: 5 },
    ],
  },
  { id: 's2', student: 'Brian Otieno', submittedAt: 'Today, 4:02 PM', status: 'submitted', onTime: true,
    flagged: { reason: 'Possible plagiarism', by: 'system' }, fileName: 'lab_report_brian.pdf', fileSize: '2.1 MB' },
  { id: 's3', student: 'Cynthia Njeri', submittedAt: 'Yesterday, 11:20 PM', status: 'graded', onTime: true, grade: 'A', score: 92, autoGrade: 92,
    fileName: 'lab_report_cynthia.pdf', fileSize: '2.6 MB' },
  { id: 's4', student: 'David Mwangi', submittedAt: '—', status: 'missing', onTime: false },
];

const TABS = [
  { key: 'overview',    label: 'OVERVIEW' },
  { key: 'submissions', label: 'SUBMISSIONS' },
  { key: 'rubric',      label: 'RUBRIC' },
];

/* -------------------- task actions menu -------------------- */

function TaskActionsMenu({ visible, task, onClose, onAction, colors }) {
  const styles = makeStyles(colors);
  if (!task) return null;
  const actions = [
    { key: 'edit',      label: 'Edit task',         icon: 'edit-2',       always: true },
    { key: 'publish',   label: 'Publish',           icon: 'upload-cloud', show: task.status === 'draft' },
    { key: 'unpublish', label: 'Unpublish',         icon: 'eye-off',      show: task.status === 'published' },
    { key: 'extend',    label: 'Extend deadline',   icon: 'clock',        show: task.status === 'published' },
    { key: 'close',     label: 'Close submissions', icon: 'lock',         show: task.status === 'published' },
    { key: 'duplicate', label: 'Duplicate task',    icon: 'copy',         always: true },
    { key: 'archive',   label: 'Archive',           icon: 'archive',      show: task.status !== 'archived' },
    { key: 'delete',    label: 'Delete task',       icon: 'trash-2',      always: true, danger: true },
  ].filter((a) => a.always || a.show);

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.menuScrim} activeOpacity={1} onPress={onClose}>
        <View style={styles.menuSheet}>
          <Text style={styles.menuTitle}>TASK ACTIONS</Text>
          {actions.map((a) => (
            <TouchableOpacity
              key={a.key}
              style={styles.menuRow}
              onPress={() => { onClose(); setTimeout(() => onAction?.(a.key, task), 200); }}
            >
              <Feather name={a.icon} size={16} color={a.danger ? '#e25b5b' : colors.fg} />
              <Text style={[styles.menuLabel, a.danger && { color: '#e25b5b' }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherTaskDetail({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const task = useMemo(
    () => normalizeTask(route?.params?.task),
    [route?.params?.task],
  );

  const [tab, setTab] = useState('submissions');
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState('list'); // 'list' | 'submission'
  const [activeSubmissionId, setActiveSubmissionId] = useState(null);

  /* Local mutable copy — grade saves update this and re-render */
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const activeSubmission =
    submissions.find((s) => s.id === activeSubmissionId) ?? null;

  /* Live counts derived from local submissions */
  const liveStats = useMemo(() => {
    const total = submissions.length;
    const submitted = submissions.filter((s) => s.status !== 'missing').length;
    const graded = submissions.filter((s) => s.status === 'graded' || s.status === 'released').length;
    const flagged = submissions.filter((s) => !!s.flagged).length;
    const auto = submissions.filter((s) => s.autoGrade != null).length;
    const scored = submissions.filter((s) => typeof s.score === 'number');
    const mean = scored.length
      ? scored.reduce((sum, s) => sum + s.score, 0) / scored.length
      : task.stats.meanGrade;
    return { submitted, total, graded, flagged, autoGraded: auto, meanGrade: mean };
  }, [submissions, task.stats.meanGrade]);

  const taskWithLiveStats = useMemo(
    () => ({ ...task, stats: liveStats }),
    [task, liveStats],
  );

  /* Task actions */
  const handleTaskAction = (key, t) => {
    switch (key) {
      case 'edit':      navigation?.navigate('Teacher-Tasks-Edit', { task: t }); break;
      case 'publish':   Alert.alert('Publish', `Publish "${t.title}" to students?`); break;
      case 'unpublish': Alert.alert('Unpublish', 'Students will no longer see this task.'); break;
      case 'extend':    Alert.alert('Extend deadline', 'Open date/time picker.'); break;
      case 'close':     Alert.alert('Close submissions', 'No further submissions accepted.'); break;
      case 'duplicate': Alert.alert('Duplicate', 'Create a copy of this task as a draft.'); break;
      case 'archive':   Alert.alert('Archive', 'Move task to archives.'); break;
      case 'delete':
        Alert.alert('Delete', `Permanently delete "${t.title}"?`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => navigation?.goBack() },
        ]);
        break;
      default: break;
    }
  };

  /* Grade saves — update local submissions */
  const handleSaveGrade = (submissionId, payload) => {
    setSubmissions((prev) =>
      prev.map((s) => {
        if (s.id !== submissionId) return s;
        const next = { ...s, feedback: payload.feedback };
        if (payload.answers) next.answers = payload.answers;
        if (payload.status === 'draft')    next.status = 'draft';
        if (payload.status === 'returned') next.status = 'returned';
        if (payload.status === 'graded' || payload.status === 'released') {
          next.status = payload.status;
          next.score = payload.total;
          next.grade = payload.grade;
        }
        return next;
      }),
    );
  };

  /* View transitions */
  const openSubmission = (s) => { setActiveSubmissionId(s.id); setView('submission'); };
  const backToList = () => { setActiveSubmissionId(null); setView('list'); };
  const goToStudent = (id) => setActiveSubmissionId(id);

  const isListView = view === 'list';

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => (isListView ? navigation?.goBack() : backToList())}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {isListView ? taskWithLiveStats.title : activeSubmission?.student ?? 'Submission'}
          </Text>
          <View style={styles.headerActions}>
            {isListView && (
              <>
                <TouchableOpacity
                  hitSlop={8}
                  onPress={() => navigation?.navigate('Teacher-Tasks-Edit', { task: taskWithLiveStats })}
                >
                  <Feather name="edit-2" size={18} color={colors.fg} />
                </TouchableOpacity>
                <TouchableOpacity hitSlop={8} onPress={() => setMenuOpen(true)}>
                  <Ionicons name="ellipsis-horizontal" size={20} color={colors.fg} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Status strip (always visible) */}
        <View style={styles.statusBar}>
          <View style={styles.statusRow}>
            <Text style={styles.statusSubject}>{taskWithLiveStats.className}</Text>
            <View style={styles.statusDot} />
          </View>
          <Text style={styles.statusDue}>
            Due {taskWithLiveStats.dueAt} · {liveStats.submitted}/{liveStats.total} submitted · {taskWithLiveStats.points} pts
          </Text>
        </View>

        {isListView ? (
          <>
            <View style={styles.tabRow}>
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <TouchableOpacity
                    key={t.key}
                    style={[styles.tabBtn, active && styles.tabBtnActive]}
                    onPress={() => setTab(t.key)}
                  >
                    <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {tab === 'overview' && <OverviewTab task={taskWithLiveStats} />}
              {tab === 'rubric'   && <RubricTab   task={taskWithLiveStats} />}
              {tab === 'submissions' && (
                <SubmissionsTab
                  task={taskWithLiveStats}
                  submissions={submissions}
                  onOpenSubmission={openSubmission}
                  onExport={() => Alert.alert('Export', 'Generate CSV of grades')}
                />
              )}
            </ScrollView>
          </>
        ) : (
          <SubmissionDetailView
            task={taskWithLiveStats}
            submissions={submissions}
            currentId={activeSubmissionId}
            onChangeStudent={goToStudent}
            onSaveGrade={handleSaveGrade}
            onBack={backToList}
          />
        )}

        <TaskActionsMenu
          visible={menuOpen}
          task={taskWithLiveStats}
          colors={colors}
          onClose={() => setMenuOpen(false)}
          onAction={handleTaskAction}
        />
      </View>
    </Layout>
  );
}