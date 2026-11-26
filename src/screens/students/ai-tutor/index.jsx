// revision/ai-tutor/index.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Keyboard, Platform, Alert, Animated, Dimensions,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

const SUBJECTS = [
  { key: 'general',   label: 'General' },
  { key: 'biology',   label: 'Biology' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'math',      label: 'Math' },
  { key: 'english',   label: 'English' },
];

const SUGGESTIONS = [
  'Explain photosynthesis in simple terms',
  'Quiz me on quadratic equations (5 questions)',
  'Why is my Chemistry grade low?',
  "Summarise this week's Biology lesson",
];

const STARTER_ASSISTANT = {
  id: 'a0',
  role: 'assistant',
  text: `Hi Amina 👋

I'm your AI study buddy. Ask me anything about your subjects — I can explain, quiz you, or help you practice.`,
  isGreeting: true,
};

const HEADER_HEIGHT = 56;
const { width: SCREEN_W } = Dimensions.get('window');
const DRAWER_W = Math.min(SCREEN_W * 0.82, 340);
const DRAWER_MS = 260;

// Simulated reply for streaming
const SAMPLE_STREAM = `Photosynthesis is how plants make their own food using sunlight. Think of it as a tiny kitchen inside the leaf:

1. **Ingredients** — water (from roots) + carbon dioxide (from air)
2. **Energy source** — sunlight
3. **Chef** — chlorophyll (green pigment)
4. **Product** — glucose (plant food) + oxygen (released)

The equation:
6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂`;

/* -------------------- sample history -------------------- */

const HISTORY = [
  {
    label: 'Today',
    items: [
      { id: 't1', title: 'Photosynthesis explained',    subject: 'Biology',   time: '14:22', active: true },
      { id: 't2', title: 'Quadratic equations quiz',     subject: 'Math',      time: '11:05' },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      { id: 't3', title: 'Why is my Chemistry grade low?', subject: 'Chemistry', time: '16:40' },
      { id: 't4', title: 'Cell structure revision',        subject: 'Biology',   time: '09:12' },
    ],
  },
  {
    label: 'This week',
    items: [
      { id: 't5', title: 'Essay structure tips',        subject: 'English', time: 'Mon' },
      { id: 't6', title: 'Organic reactions practice',  subject: 'Chemistry', time: 'Mon' },
      { id: 't7', title: 'Trigonometry basics',         subject: 'Math',    time: 'Sun' },
    ],
  },
  {
    label: 'Earlier',
    items: [
      { id: 't8',  title: 'Genetics — Mendelian inheritance', subject: 'Biology',   time: 'Oct 18' },
      { id: 't9',  title: 'Poetry analysis guide',            subject: 'English',   time: 'Oct 15' },
      { id: 't10', title: 'Newton\'s laws overview',          subject: 'Physics',   time: 'Oct 10' },
    ],
  },
];

/* -------------------- chat components -------------------- */

function EmptyState({ onSuggestion, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.greetBlock}>
        <View style={styles.botAvatar}>
          <Text style={styles.botAvatarText}>🤖</Text>
        </View>
        <Text style={styles.greetTitle}>Hi Amina 👋</Text>
        <Text style={styles.greetBody}>
          I'm your AI study buddy. Ask me anything about your subjects —
          I can explain, quiz you, or help you practice.
        </Text>
      </View>

      <Text style={styles.sectionLabel}>TRY ASKING</Text>
      <View style={styles.suggestionsList}>
        {SUGGESTIONS.map((s) => (
          <TouchableOpacity
            key={s}
            style={styles.suggestionCard}
            onPress={() => onSuggestion(s)}
            activeOpacity={0.7}
          >
            <Text style={styles.suggestionText} numberOfLines={2}>
              {s}
            </Text>
            <Ionicons name="arrow-forward" size={14} color={colors.fgMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function MessageBubble({
  msg, isStreaming, onStop, onFeedback, onCopy, onShare, colors,
}) {
  const styles = makeStyles(colors);
  const isUser = msg.role === 'user';
  const isStreamingMsg = isStreaming && !isUser;

  return (
    <View
      style={[styles.msgRow, isUser ? styles.msgRowUser : styles.msgRowAssistant]}
    >
      <View
        style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}
      >
        {!isUser && (
          <View style={styles.bubbleHeader}>
            <Text style={styles.bubbleBot}>🤖</Text>
            <Text style={styles.bubbleRole}>AI Tutor</Text>
          </View>
        )}

        <View>
          <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>
            {msg.text}
            {isStreamingMsg ? <Text style={styles.cursor}>▌</Text> : null}
          </Text>
        </View>

        {!isStreamingMsg && msg.sources?.length > 0 && (
          <View style={styles.sourcesBlock}>
            <Text style={styles.sourcesLabel}>
              📚 Sources: {msg.sources.join(' · ')}
            </Text>
          </View>
        )}

        {!isStreamingMsg && msg.showFeedback && (
          <View style={styles.feedbackRow}>
            <TouchableOpacity
              style={styles.feedbackBtn}
              onPress={() => onFeedback(msg, 'helpful')}
              activeOpacity={0.7}
            >
              <Text style={styles.feedbackText}>👍 Helpful</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.feedbackBtn}
              onPress={() => onFeedback(msg, 'unhelpful')}
              activeOpacity={0.7}
            >
              <Text style={styles.feedbackText}>👎 Not helpful</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isStreamingMsg && !isUser && (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onCopy(msg)}
              activeOpacity={0.7}
            >
              <Ionicons name="copy-outline" size={12} color={colors.fgMuted} />
              <Text style={styles.actionText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onShare(msg)}
              activeOpacity={0.7}
            >
              <Ionicons name="share-outline" size={12} color={colors.fgMuted} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isStreamingMsg && (
          <Text style={[styles.timeText, isUser && styles.timeTextUser]}>
            {msg.time}
          </Text>
        )}
      </View>

      {isStreamingMsg && onStop ? (
        <TouchableOpacity
          style={styles.stopBtn}
          onPress={onStop}
          activeOpacity={0.7}
        >
          <Ionicons name="stop-circle-outline" size={14} color="#e25b5b" />
          <Text style={styles.stopBtnText}>STOP GENERATING</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function SubjectPicker({ value, onChange, colors }) {
  const styles = makeStyles(colors);
  const [open, setOpen] = useState(false);
  const current = SUBJECTS.find((s) => s.key === value);

  return (
    <View style={styles.pickerWrap}>
      <TouchableOpacity
        style={styles.pickerBtn}
        onPress={() => setOpen((v) => !v)}
        activeOpacity={0.7}
      >
        <Text style={styles.pickerLabel}>SUBJECT</Text>
        <Text style={styles.pickerValue}>{current?.label ?? 'General'}</Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={12}
          color={colors.fgMuted}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.pickerMenu}>
          {SUBJECTS.map((s) => {
            const active = s.key === value;
            return (
              <TouchableOpacity
                key={s.key}
                style={[styles.pickerItem, active && styles.pickerItemActive]}
                onPress={() => {
                  onChange(s.key);
                  setOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    active && styles.pickerItemTextActive,
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <Text style={styles.pickerHint}>
        Helps me give more focused answers
      </Text>
    </View>
  );
}

function HistoryDrawer({
  visible,
  progress,
  onClose,
  onNewChat,
  onSelectThread,
  activeThreadId,
  colors,
}) {
  const styles = makeStyles(colors);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_W, 0],        // ← flipped: slides in from the right
  });
  const scrimOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  if (!visible) return null;

  return (
    <View style={styles.drawerRoot}>
      {/* Scrim — tap to close */}
      <Animated.View
        style={[styles.drawerScrim, { opacity: scrimOpacity }]}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      {/* Drawer panel */}
      <Animated.View
        style={[
          styles.drawerPanel,
          { width: DRAWER_W, transform: [{ translateX }] },
        ]}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>HISTORY</Text>
          <TouchableOpacity onPress={onClose} hitSlop={8}>
            <Ionicons name="close" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.newChatBtn}
          onPress={onNewChat}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={16} color={colors.buttonFg} />
          <Text style={styles.newChatText}>NEW CHAT</Text>
        </TouchableOpacity>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.drawerList}
          showsVerticalScrollIndicator={false}
        >
          {HISTORY.map((group) => (
            <View key={group.label} style={styles.historyGroup}>
              <Text style={styles.historyGroupLabel}>
                {group.label.toUpperCase()}
              </Text>
              {group.items.map((item) => {
                const isActive = item.id === activeThreadId;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.historyItem,
                      isActive && styles.historyItemActive,
                    ]}
                    onPress={() => onSelectThread(item)}
                    activeOpacity={0.7}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.historyTitle,
                          isActive && styles.historyTitleActive,
                        ]}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <Text style={styles.historyMeta}>
                        {item.subject} · {item.time}
                      </Text>
                    </View>
                    {isActive ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color={colors.accent}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function AiTutor({ route, navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const initialPrompt = route?.params?.seedPrompt;
  const [subject, setSubject] = useState(route?.params?.subject ?? 'general');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState('t1');

  const drawerProgress = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const streamTimersRef = useRef([]);

  /* Keyboard visibility */
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  /* Seed prompt on mount */
  useEffect(() => {
    if (!initialPrompt) return;
    handleSend(initialPrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Cleanup stream timers */
  useEffect(() => {
    return () => {
      streamTimersRef.current.forEach(clearTimeout);
      streamTimersRef.current = [];
    };
  }, []);

  /* Drawer open/close */
  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerProgress, {
      toValue: 1,
      duration: DRAWER_MS,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = (onDone) => {
    Animated.timing(drawerProgress, {
      toValue: 0,
      duration: DRAWER_MS,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;
      setDrawerOpen(false);
      if (onDone) onDone();
    });
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const cancelStream = () => {
    streamTimersRef.current.forEach(clearTimeout);
    streamTimersRef.current = [];
    setStreamingId(null);
    setSending(false);
  };

  const streamAssistantReply = (fullText, meta = {}) => {
    const replyId = `a${Date.now()}`;
    const startTime = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setMessages((prev) => [
      ...prev,
      {
        id: replyId,
        role: 'assistant',
        text: '',
        sources: meta.sources ?? ['KCSE 2023 P1'],
        showFeedback: true,
        time: startTime,
        isStreaming: true,
      },
    ]);
    setStreamingId(replyId);
    scrollToEnd();

    const CHUNK = 12;
    const TICK_MS = 40;
    let i = 0;

    const tick = () => {
      i = Math.min(fullText.length, i + CHUNK);
      setMessages((prev) =>
        prev.map((m) => (m.id === replyId ? { ...m, text: fullText.slice(0, i) } : m))
      );
      scrollToEnd();

      if (i < fullText.length) {
        const t = setTimeout(tick, TICK_MS);
        streamTimersRef.current.push(t);
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.id === replyId ? { ...m, isStreaming: false } : m))
        );
        setStreamingId(null);
        setSending(false);
        streamTimersRef.current = [];
      }
    };

    const first = setTimeout(tick, TICK_MS);
    streamTimersRef.current.push(first);
  };

  const handleSend = (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || sending) return;

    const userMsg = {
      id: `u${Date.now()}`,
      role: 'user',
      text,
      time: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);
    scrollToEnd();

    const start = setTimeout(() => {
      streamAssistantReply(SAMPLE_STREAM, { sources: ['KCSE 2023 P1 · Chapter 4'] });
    }, 600);
    streamTimersRef.current.push(start);
  };

  const handleSuggestion = (text) => handleSend(text);

  const handleStop = () => {
    cancelStream();
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m))
    );
  };

  const handleFeedback = (msg, kind) => {
    Alert.alert(
      kind === 'helpful' ? 'Thanks!' : 'Thanks for the feedback',
      kind === 'helpful'
        ? 'Glad this was useful. It helps me learn what works.'
        : "I'll try to improve. What was missing?"
    );
  };

  const handleCopy = () => Alert.alert('Copied', 'Response copied to clipboard.');
  const handleShare = () => Alert.alert('Share', 'Share this response?');

  const handleNewChat = () => {
    closeDrawer(() => {
      cancelStream();
      setMessages([]);
      setInput('');
      setActiveThreadId(null);
    });
  };

  const handleSelectThread = (item) => {
    closeDrawer(() => {
      cancelStream();
      setActiveThreadId(item.id);
      // In production: fetch messages for this thread
      // For demo: start with a small pre-seeded thread
      setMessages([
        {
          id: 'a0',
          role: 'assistant',
          text: `Loading "${item.title}"…\n\n(In production, the full history of this thread would appear here.)`,
          time: item.time,
        },
      ]);
    });
  };

  const showEmptyState = messages.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ height: insets.top, backgroundColor: colors.bg }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? HEADER_HEIGHT : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            AI TUTOR
            {subject !== 'general'
              ? ` · ${SUBJECTS.find((s) => s.key === subject)?.label.toUpperCase()}`
              : ''}
          </Text>
          <TouchableOpacity onPress={openDrawer} hitSlop={8}>
            <Ionicons name="time-outline" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        {/* Body */}
        {showEmptyState ? (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: keyboardVisible ? 16 : 40 + insets.bottom },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <EmptyState onSuggestion={handleSuggestion} colors={colors} />
            <SubjectPicker value={subject} onChange={setSubject} colors={colors} />
          </ScrollView>
        ) : (
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: keyboardVisible ? 16 : 40 + insets.bottom },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                msg={m}
                isStreaming={m.id === streamingId}
                onStop={handleStop}
                onFeedback={handleFeedback}
                onCopy={handleCopy}
                onShare={handleShare}
                colors={colors}
              />
            ))}
            {sending && streamingId === null && (
              <View style={styles.typingRow}>
                <Text style={styles.typingText}>AI is typing…</Text>
              </View>
            )}
          </ScrollView>
        )}

        {/* Input bar */}
        <View
          style={[
            styles.inputBar,
            { paddingBottom: keyboardVisible ? 12 : 12 + insets.bottom },
          ]}
        >
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Ask anything…"
              placeholderTextColor={colors.placeholder}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={1000}
              onSubmitEditing={() => handleSend()}
              editable={!sending}
            />
            <TouchableOpacity
              style={styles.micBtn}
              onPress={() => Alert.alert('Voice input', 'Coming soon')}
              hitSlop={8}
            >
              <Ionicons name="mic-outline" size={18} color={colors.fgMuted} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sendBtn,
                (!input.trim() || sending) && styles.sendBtnDisabled,
              ]}
              onPress={() => handleSend()}
              disabled={!input.trim() || sending}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-up" size={16} color={colors.buttonFg} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* History drawer */}
      <HistoryDrawer
        visible={drawerOpen}
        progress={drawerProgress}
        onClose={() => closeDrawer()}
        onNewChat={handleNewChat}
        onSelectThread={handleSelectThread}
        activeThreadId={activeThreadId}
        colors={colors}
      />
    </View>
  );
}