// TaskDetail.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- base task -------------------- */

// Provides every field the screen needs. Merged with route params so
// partial tasks coming from the list still render.
const BASE_TASK = {
  id: 'default',
  title: 'Biology Lab Report',
  subject: 'Biology',
  teacher: 'Mr. Otieno',
  dueAt: 'Today at 5:00 PM',
  countdown: '4h 12m left',
  status: 'open', // 'open' | 'submitted' | 'graded'

  instructions:
    "Write a lab report on the onion cell experiment. Include: hypothesis, method, observations, conclusion. Use the rubric on page 2 of the lab manual. Your report should be 3–4 pages, double-spaced, with figures numbered and labeled. Make sure to cite any external sources and attach your raw data sheet alongside the final report. Hypothesis should be specific and testable. Observations section should include at least three distinct cell structures identified under the microscope with their measured sizes and any distinguishing features. Conclusion must directly reference whether the original hypothesis was supported or refuted by the observations.",

  attachments: [
    { id: 'a1', name: 'lab_manual.pdf',  size: '1.2 MB', type: 'pdf'   },
    { id: 'a2', name: 'data_sheet.xlsx', size: '340 KB', type: 'sheet' },
  ],

  rubric: [
    { name: 'Hypothesis',   weight: '20%', max: 20 },
    { name: 'Method',       weight: '25%', max: 25 },
    { name: 'Observations', weight: '30%', max: 30 },
    { name: 'Conclusion',   weight: '25%', max: 25 },
  ],

  submission: {
    submittedAt: 'Oct 26 at 3:48 PM',
    fileName: 'lab_report_final.pdf',
    fileSize: '2.4 MB',
    text: 'Completed the onion cell lab, hypothesis matched observations.',
    editableUntil: '5:00 PM',
  },

  grading: {
    grade: 'B+',
    score: 82,
    gradedBy: 'Mr. Otieno',
    gradedAt: 'Oct 28',
    breakdown: [
      { name: 'Hypothesis',   weight: '20%', earned: 16, max: 20 },
      { name: 'Method',       weight: '25%', earned: 22, max: 25 },
      { name: 'Observations', weight: '30%', earned: 24, max: 30 },
      { name: 'Conclusion',   weight: '25%', earned: 20, max: 25 },
    ],
    feedback:
      'Great observations section! Hypothesis could be more specific — see my notes on p.3.',
  },
};

/* -------------------- task builder -------------------- */

// Deterministic pseudo-random helpers so the same task id always
// generates the same data — no flicker between renders.
function seeded(n) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x); // 0..1
}
function pick(arr, seed) {
  return arr[Math.floor(seeded(seed) * arr.length)];
}
function range(seed, min, max) {
  return Math.round(min + seeded(seed) * (max - min));
}
function slug(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

// Merge a partial task (from Tasks.jsx) with the full BASE_TASK.
// Missing fields are generated from a seed derived from the task id.
function buildTask(partial = {}) {
  const id = partial.id ?? 'default';
  const seed = String(id)
    .split('')
    .reduce((s, c) => s + c.charCodeAt(0), 0);

  const status = partial.status ?? BASE_TASK.status;
  const rubric = partial.rubric ?? BASE_TASK.rubric;
  const title = partial.title ?? BASE_TASK.title;
  const subject = partial.subject ?? BASE_TASK.subject;
  const teacher = partial.teacher ?? BASE_TASK.teacher;

  // Attachments — vary by task
  const attachments =
    partial.attachments ??
    (seeded(seed) > 0.5
      ? BASE_TASK.attachments
      : [{ id: 'a1', name: `${slug(title)}.pdf`, size: '780 KB', type: 'pdf' }]);

  // Instructions — vary per subject
  const instructions =
    partial.instructions ??
    (partial.subject
      ? `Complete the ${title} for ${subject}. Follow the instructions on the attached worksheet. Show your working where applicable and submit before the deadline. Refer to ${teacher}'s notes from last week if you get stuck.`
      : BASE_TASK.instructions);

  // Submission block
  const submission =
    status === 'submitted' || status === 'graded'
      ? {
          submittedAt:
            typeof partial.due === 'string' && partial.due.startsWith('Submitted')
              ? partial.due.replace('Submitted ', '')
              : 'Oct 26 at 3:48 PM',
          fileName: `${slug(title)}_final.pdf`,
          fileSize: `${(1 + seeded(seed) * 3).toFixed(1)} MB`,
          text: 'Submitted before the deadline. Work attached.',
          editableUntil: '5:00 PM',
        }
      : BASE_TASK.submission;

  // Grading block
  const grading =
    status === 'graded'
      ? {
          grade: partial.grade ?? pick(['A', 'A-', 'B+', 'B', 'B-'], seed),
          score:
            typeof partial.score === 'string'
              ? parseInt(partial.score, 10)
              : partial.score ?? range(seed, 70, 92),
          gradedBy: teacher,
          gradedAt:
            typeof partial.due === 'string' && partial.due.startsWith('Graded')
              ? partial.due.replace('Graded ', '')
              : 'Oct 28',
          breakdown: rubric.map((r, i) => ({
            name: r.name,
            weight: r.weight,
            max: r.max,
            earned: Math.round(r.max * (0.7 + seeded(seed + i) * 0.3)),
          })),
          feedback:
            'Good submission overall. Some sections could be more detailed — see my comments.',
        }
      : BASE_TASK.grading;

  return {
    ...BASE_TASK,
    ...partial,
    id,
    status,
    rubric,
    attachments,
    instructions,
    submission,
    grading,
    dueAt: partial.dueAt ?? partial.due ?? BASE_TASK.dueAt,
    countdown: partial.countdown ?? BASE_TASK.countdown,
  };
}

/* -------------------- helpers -------------------- */

function attachmentIcon(type) {
  if (type === 'pdf')   return 'file-text';
  if (type === 'sheet') return 'grid';
  if (type === 'image') return 'image';
  return 'paperclip';
}

function statusTint(status, colors) {
  if (status === 'open')      return colors.accent;
  if (status === 'submitted') return '#4caf7d';
  if (status === 'graded')    return '#4d7cff';
  return colors.fgMuted;
}

/* -------------------- components -------------------- */

function StatusBar({ task, colors }) {
  const styles = makeStyles(colors);
  const tint = statusTint(task.status, colors);

  return (
    <View style={[styles.statusBar, { borderLeftColor: tint }]}>
      <View style={styles.statusRow}>
        <Text style={styles.statusSubject}>
          {task.subject} · {task.teacher}
        </Text>
        <View style={[styles.statusDot, { backgroundColor: tint }]} />
      </View>
      <Text style={[styles.statusDue, { color: tint }]}>
        {task.status === 'graded'
          ? `Graded ${task.grading.gradedAt} · ${task.grading.grade} (${task.grading.score}%)`
          : task.status === 'submitted'
          ? `Submitted ${task.submission.submittedAt}`
          : `Due ${task.dueAt} · ${task.countdown}`}
      </Text>
    </View>
  );
}

function Instructions({ text, colors }) {
  const styles = makeStyles(colors);
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 300;
  const isLong = text.length > LIMIT;
  const shown = expanded || !isLong ? text : text.slice(0, LIMIT) + '…';

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
      <Text style={styles.bodyText}>{shown}</Text>
      {isLong && (
        <TouchableOpacity onPress={() => setExpanded((v) => !v)} hitSlop={6}>
          <Text style={styles.readMore}>
            {expanded ? 'SHOW LESS' : 'READ MORE'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function Attachments({ items, colors }) {
  const styles = makeStyles(colors);
  if (!items?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>ATTACHMENTS</Text>
      {items.map((a) => (
        <View key={a.id} style={styles.attachmentRow}>
          <Feather name={attachmentIcon(a.type)} size={16} color={colors.fg} />
          <View style={styles.attachmentBody}>
            <Text style={styles.attachmentName} numberOfLines={1}>
              {a.name}
            </Text>
            <Text style={styles.attachmentMeta}>{a.size}</Text>
          </View>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => Alert.alert('Download', `Starting ${a.name}`)}
            hitSlop={6}
          >
            <Feather name="download" size={14} color={colors.accent} />
            <Text style={styles.downloadText}>DOWNLOAD</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

function Rubric({ items, colors }) {
  const styles = makeStyles(colors);
  if (!items?.length) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>RUBRIC</Text>
      <View style={styles.rubricBlock}>
        {items.map((r, i) => (
          <View key={i} style={styles.rubricRow}>
            <Text style={styles.rubricName} numberOfLines={1}>
              {r.name}
            </Text>
            <Text style={styles.rubricWeight}>{r.weight}</Text>
            <Text style={styles.rubricScore}>_/{r.max}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function SubmissionZone({ task, colors }) {
  const styles = makeStyles(colors);

  // Upload lifecycle
  // 'idle' | 'uploading' | 'failed' | 'success'
  const [uploadState, setUploadState] = useState('idle');
  const [progress, setProgress] = useState(0);

  const [mode, setMode] = useState(null);           // 'file' | 'photo' | 'text'
  const [textBody, setTextBody] = useState('');
  const [file, setFile] = useState(null);           // { name, size }
  const [submitOnSuccess, setSubmitOnSuccess] = useState(false);

  const { status, submission } = task;

  /* ---- submitted / graded view (unchanged) ---- */
  if (status === 'submitted' || status === 'graded') {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {status === 'graded' ? 'SUBMISSION' : 'SUBMITTED'}
        </Text>
        <View style={styles.submittedCard}>
          <View style={styles.submittedRow}>
            <Ionicons name="checkmark-circle" size={16} color="#4caf7d" />
            <Text style={styles.submittedTime}>{submission.submittedAt}</Text>
          </View>
          <View style={styles.submittedAttachment}>
            <Feather name="file-text" size={14} color={colors.fg} />
            <Text style={styles.submittedFileName} numberOfLines={1}>
              {submission.fileName}
            </Text>
            <Text style={styles.submittedFileSize}>{submission.fileSize}</Text>
          </View>
          {submission.text && (
            <Text style={styles.submittedText}>"{submission.text}"</Text>
          )}
          {status === 'submitted' && (
            <TouchableOpacity
              style={styles.resubmitBtn}
              onPress={() => Alert.alert('Resubmit', 'Reopen submission?')}
            >
              <Ionicons name="refresh" size={14} color={colors.fg} />
              <Text style={styles.resubmitText}>RESUBMIT</Text>
            </TouchableOpacity>
          )}
          {status === 'submitted' && (
            <Text style={styles.editableNote}>
              You can still edit until {submission.editableUntil}.
            </Text>
          )}
        </View>
      </View>
    );
  }

  /* ---- fake upload driver ---- */
  const startUpload = ({ name, size }) => {
    setFile({ name, size });
    setUploadState('uploading');
    setProgress(0);

    let p = 0;
    const tick = setInterval(() => {
      p += 8 + Math.random() * 8;
      if (p >= 100) {
        clearInterval(tick);
        // 30% chance of failure for demo purposes
        const failed = Math.random() < 0.3;
        if (failed) {
          setUploadState('failed');
        } else {
          setProgress(100);
          setUploadState('success');
        }
      } else {
        setProgress(p);
      }
    }, 220);
  };

  const onPickFile = () => {
    // Replace with DocumentPicker / ImagePicker in production
    startUpload({ name: 'lab_report.pdf', size: '1.8 MB' });
  };

  const onCancel = () => {
    setUploadState('idle');
    setProgress(0);
    setFile(null);
  };

  const onRetry = () => {
    if (file) startUpload(file);
  };

  const onChooseAnother = () => {
    setUploadState('idle');
    setProgress(0);
    setFile(null);
  };

  const onSubmit = () => {
    if (mode === 'text' && textBody.trim().length > 0) {
      setSubmitOnSuccess(true);
      setUploadState('uploading');
      setProgress(0);
      let p = 0;
      const tick = setInterval(() => {
        p += 20;
        if (p >= 100) {
          clearInterval(tick);
          setProgress(100);
          setUploadState('success');
        } else {
          setProgress(p);
        }
      }, 200);
      return;
    }
    if (!file) {
      Alert.alert('Nothing to submit', 'Attach a file or type text first.');
      return;
    }
    if (uploadState === 'success') {
      Alert.alert('Submitted', 'Assignment submitted successfully.');
      return;
    }
    // If not yet uploaded, kick off upload first
    if (uploadState === 'idle') {
      startUpload({ name: 'lab_report.pdf', size: '1.8 MB' });
    }
  };

  /* ---- idle form ---- */
  const showForm = uploadState === 'idle' || uploadState === 'failed';

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>SUBMISSION</Text>

      {/* Mode row (hidden during upload / success) */}
      {(uploadState === 'idle' || uploadState === 'failed') && (
        <View style={styles.modeRow}>
          {[
            { key: 'file',  icon: 'file',   label: 'FILE'  },
            { key: 'photo', icon: 'camera', label: 'PHOTO' },
            { key: 'text',  icon: 'edit-3', label: 'TEXT'  },
          ].map((m) => {
            const active = mode === m.key;
            return (
              <TouchableOpacity
                key={m.key}
                style={[styles.modeBtn, active && styles.modeBtnActive]}
                onPress={() => setMode(m.key)}
              >
                <Feather
                  name={m.icon}
                  size={14}
                  color={active ? colors.accentContrast : colors.fg}
                />
                <Text
                  style={[styles.modeText, active && styles.modeTextActive]}
                >
                  {m.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Text mode input */}
      {mode === 'text' && (uploadState === 'idle' || uploadState === 'failed') && (
        <TextInput
          style={styles.textInput}
          placeholder="Type your submission…"
          placeholderTextColor={colors.placeholder}
          multiline
          value={textBody}
          onChangeText={setTextBody}
          textAlignVertical="top"
        />
      )}

      {/* Attach box (idle) */}
      {mode !== 'text' && uploadState === 'idle' && (
        <TouchableOpacity
          style={styles.attachBox}
          onPress={onPickFile}
          activeOpacity={0.7}
        >
          <Feather name="plus" size={16} color={colors.accent} />
          <Text style={styles.attachBoxText}>
            No file attached yet — tap to attach
          </Text>
        </TouchableOpacity>
      )}

      {/* Uploading */}
      {uploadState === 'uploading' && file && (
        <View style={styles.uploadCard}>
          <View style={styles.uploadHeader}>
            <Text style={styles.uploadLabel}>UPLOADING…</Text>
            <TouchableOpacity onPress={onCancel} hitSlop={8}>
              <Feather name="x" size={16} color={colors.fgMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.uploadFileRow}>
            <Feather name="paperclip" size={14} color={colors.fg} />
            <Text style={styles.uploadFileName} numberOfLines={1}>
              {file.name}
            </Text>
            <Text style={styles.uploadFileSize}>· {file.size}</Text>
          </View>

          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(100, Math.round(progress))}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPct}>
              {Math.min(100, Math.round(progress))}%
            </Text>
          </View>
        </View>
      )}

      {/* Upload failed */}
      {uploadState === 'failed' && file && (
        <View style={[styles.uploadCard, styles.uploadCardError]}>
          <View style={styles.uploadHeader}>
            <View style={styles.failedHeaderLeft}>
              <Ionicons name="alert-circle" size={16} color="#e25b5b" />
              <Text style={styles.failedLabel}>UPLOAD FAILED</Text>
            </View>
          </View>

          <View style={styles.uploadFileRow}>
            <Feather name="paperclip" size={14} color={colors.fg} />
            <Text style={styles.uploadFileName} numberOfLines={1}>
              {file.name}
            </Text>
            <Text style={styles.uploadFileSize}>· {file.size}</Text>
          </View>

          <View style={styles.failedActions}>
            <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
              <Feather name="refresh-cw" size={12} color={colors.accentContrast} />
              <Text style={styles.retryText}>RETRY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chooseAnotherBtn}
              onPress={onChooseAnother}
            >
              <Feather name="folder" size={12} color={colors.fg} />
              <Text style={styles.chooseAnotherText}>CHOOSE ANOTHER</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Success */}
      {uploadState === 'success' && (
        <View style={styles.successCard}>
          <View style={styles.successRow}>
            <Ionicons name="checkmark-circle" size={18} color="#4caf7d" />
            <Text style={styles.successTitle}>SUBMITTED SUCCESSFULLY</Text>
          </View>
          <Text style={styles.successMeta}>
            Due {task.dueAt} · On time
          </Text>
          {file && (
            <View style={styles.submittedAttachment}>
              <Feather name="file-text" size={14} color={colors.fg} />
              <Text style={styles.submittedFileName} numberOfLines={1}>
                {file.name}
              </Text>
              <Text style={styles.submittedFileSize}>{file.size}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.resubmitBtn}
            onPress={() => {
              setUploadState('idle');
              setProgress(0);
              setFile(null);
            }}
          >
            <Ionicons name="refresh" size={14} color={colors.fg} />
            <Text style={styles.resubmitText}>RESUBMIT</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Submit button — hidden during upload/success */}
      {showForm && (
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={onSubmit}
          disabled={uploadState === 'uploading'}
        >
          <Ionicons
            name="rocket-outline"
            size={16}
            color={colors.buttonFg}
          />
          <Text style={styles.submitBtnText}>SUBMIT ASSIGNMENT</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function GradedSection({ grading, colors }) {
  const styles = makeStyles(colors);
  if (!grading?.breakdown?.length) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>GRADED</Text>

      <View style={styles.gradeRow}>
        <View style={styles.gradePill}>
          <Text style={styles.gradePillText}>{grading.grade}</Text>
        </View>
        <Text style={styles.gradePct}>{grading.score}%</Text>
        <Text style={styles.gradeBy}>
          by {grading.gradedBy} · {grading.gradedAt}
        </Text>
      </View>

      <Text style={styles.subsectionTitle}>RUBRIC BREAKDOWN</Text>

      <View style={styles.breakdownBlock}>
        {grading.breakdown.map((b, i) => {
          const pct = Math.round((b.earned / b.max) * 100);
          return (
            <View key={i} style={styles.breakdownRow}>
              <View style={styles.breakdownHeader}>
                <Text style={styles.breakdownName} numberOfLines={1}>
                  {b.name}
                </Text>
                <Text style={styles.breakdownWeight}>{b.weight}</Text>
                <Text style={styles.breakdownScore}>
                  {b.earned}/{b.max}
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${pct}%` }]} />
              </View>
            </View>
          );
        })}
      </View>

      <Text style={styles.subsectionTitle}>FEEDBACK</Text>
      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackBy}>{grading.gradedBy}</Text>
        <Text style={styles.feedbackText}>"{grading.feedback}"</Text>
        <TouchableOpacity
          style={styles.replyBtn}
          onPress={() => Alert.alert('Reply', 'Thread reply — wire to comments API')}
        >
          <Ionicons name="chatbubble-outline" size={14} color={colors.fg} />
          <Text style={styles.replyText}>REPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TaskDetail({ route, navigation }) {
  const task = buildTask(route?.params?.task ?? {});
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <Layout>
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {task.title}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.fg} />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="notifications-outline" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Pinned status bar */}
      <StatusBar task={task} colors={colors} />

      {/* Scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Instructions text={task.instructions} colors={colors} />
        <Attachments items={task.attachments} colors={colors} />

        {task.status === 'open' && (
          <Rubric items={task.rubric} colors={colors} />
        )}

        <SubmissionZone task={task} colors={colors} />

        {task.status === 'graded' && (
          <GradedSection grading={task.grading} colors={colors} />
        )}
      </ScrollView>
    </View>
    </Layout>
  );
}