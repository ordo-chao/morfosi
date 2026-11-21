// src/pages/teachers/resources/index.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialsView from './materials/index.jsx';
import QuestionBankView from './question-bank/index.jsx';

const TABS = [
  { key: 'materials',      label: 'MATERIALS' },
  { key: 'question-bank',  label: 'QUESTION BANK' },
];

export default function TeacherResources({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [tab, setTab] = useState(route?.params?.tab ?? 'materials');

  useEffect(() => {
    if (route?.params?.tab) setTab(route.params.tab);
  }, [route?.params?.tab]);

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>RESOURCES</Text>
          <TouchableOpacity hitSlop={8} onPress={() => navigation?.navigate('Teacher-Notifications')}>
            <Ionicons name="notifications-outline" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setTab(t.key)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1 }}>
          {tab === 'materials' && <MaterialsView navigation={navigation} />}
          {tab === 'question-bank' && <QuestionBankView navigation={navigation} />}
        </View>
      </View>
    </Layout>
  );
}