import { Database } from 'nitromelondb';
import SQLiteAdapter from 'nitromelondb/adapters/sqlite';

import schema from './schemas';
import migrations from './migrations';
import { User } from './models';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'morfosi',

  onSetUpError: (error) => {
    console.error('[Morfosi DB] Setup error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [User],
});