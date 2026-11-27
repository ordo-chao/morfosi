# To build for testing

adb uninstall com.morfosi

npx react-native run-android --active-arch-only --main-activity MainActivityDefault

# Cheat sheet for watermelondb

Let's build a complete **Users CRUD screen** in Morfosi using your existing NitromelonDB setup.

We'll cover all five operations:

| Operation | What we'll do |
|---|---|
| Create | Add a user with name, email and avatar |
| Read | Display all saved users |
| Update | Edit an existing user's details |
| Delete | Permanently delete a user |
| Search | Search users by name or email |

We'll keep your existing database structure. No extra repository or service layer is necessary for this learning example. The screen will interact directly with the database so you can understand how NitromelonDB works.

The API follows the WatermelonDB-style collection, writer and query patterns supported by NitromelonDB. [watermelondb.dev](https://watermelondb.dev/docs/CRUD?utm_source=chatgpt.com)

## 1. Confirm your database exports

First, make sure these files have the correct exports.

**`src/database/schemas/index.js`**

Your schema should end with:

```javascript
export default schema;
```

**`src/database/models/user.js`**

Your model should look like:

```javascript
import { Model } from 'nitromelondb';
import { text, field } from 'nitromelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @text('name')
  name;

  @text('email')
  email;

  @text('avatar')
  avatar;

  @field('created_at')
  createdAt;

  @field('updated_at')
  updatedAt;
}
```

**`src/database/models/index.js`**

```javascript
export { default as User } from './user';
```

**`src/database/migrations/index.js`**

```javascript
import { schemaMigrations } from 'nitromelondb/Schema/migrations';

const migrations = schemaMigrations({
  migrations: [],
});

export default migrations;
```

**`src/database/index.js`**

```javascript
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
```

## 2. Create the Users screen

Create the directory and file:

```bash
mkdir -p src/screens
touch src/screens/UsersScreen.jsx
```

Add the following code to **`src/screens/UsersScreen.jsx`**:

```jsx
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

import { Q } from 'nitromelondb';

import { database } from '../database';

const UsersScreen = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  // User list state
  const [users, setUsers] = useState([]);

  // Search state
  const [search, setSearch] = useState('');

  // Editing state
  const [editingUserId, setEditingUserId] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  const usersCollection = database.get('users');

  // ==========================================
  // READ USERS
  // ==========================================

  const getUsers = async () => {
    try {
      setLoading(true);

      let query;

      if (search.trim()) {
        const searchTerm = `%${Q.sanitizeLikeString(search.trim())}%`;

        query = usersCollection.query(
          Q.or(
            Q.where('name', Q.like(searchTerm)),
            Q.where('email', Q.like(searchTerm)),
          ),
        );
      } else {
        query = usersCollection.query();
      }

      const results = await query.fetch();

      setUsers(results);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      Alert.alert('Error', 'Could not load users.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users whenever the search value changes
  useEffect(() => {
    getUsers();
  }, [search]);

  // ==========================================
  // CREATE / UPDATE USER
  // ==========================================

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation', 'Name and email are required.');
      return;
    }

    try {
      const timestamp = Date.now();

      await database.write(async () => {
        if (editingUserId) {
          // UPDATE EXISTING USER
          const user = await usersCollection.find(editingUserId);

          await user.update((record) => {
            record.name = name.trim();
            record.email = email.trim();
            record.avatar = avatar.trim() || null;
            record.updatedAt = timestamp;
          });
        } else {
          // CREATE NEW USER
          await usersCollection.create((record) => {
            record.name = name.trim();
            record.email = email.trim();
            record.avatar = avatar.trim() || null;
            record.createdAt = timestamp;
            record.updatedAt = timestamp;
          });
        }
      });

      clearForm();
      await getUsers();

      Alert.alert(
        'Success',
        editingUserId
          ? 'User updated successfully.'
          : 'User created successfully.',
      );
    } catch (error) {
      console.error('Failed to save user:', error);
      Alert.alert('Error', 'Could not save user.');
    }
  };

  // ==========================================
  // LOAD USER INTO FORM FOR EDITING
  // ==========================================

  const handleEdit = (user) => {
    setEditingUserId(user.id);

    setName(user.name);
    setEmail(user.email);
    setAvatar(user.avatar || '');
  };

  // ==========================================
  // DELETE USER
  // ==========================================

  const handleDelete = (user) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${user.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',

          onPress: async () => {
            try {
              await database.write(async () => {
                const record = await usersCollection.find(user.id);

                await record.destroyPermanently();
              });

              await getUsers();

              Alert.alert('Success', 'User deleted successfully.');
            } catch (error) {
              console.error('Failed to delete user:', error);
              Alert.alert('Error', 'Could not delete user.');
            }
          },
        },
      ],
    );
  };

  // ==========================================
  // CLEAR FORM
  // ==========================================

  const clearForm = () => {
    setName('');
    setEmail('');
    setAvatar('');
    setEditingUserId(null);
  };

  // ==========================================
  // RENDER USER
  // ==========================================

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>

      <Text>{item.email}</Text>

      <Text>
        Avatar: {item.avatar || 'Not provided'}
      </Text>

      <View style={styles.actions}>
        <Button
          title="Edit"
          onPress={() => handleEdit(item)}
        />

        <Button
          title="Delete"
          color="red"
          onPress={() => handleDelete(item)}
        />
      </View>
    </View>
  );

  // ==========================================
  // SCREEN UI
  // ==========================================

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Morfosi Users</Text>

      {/* SEARCH */}
      <TextInput
        style={styles.input}
        placeholder="Search by name or email..."
        value={search}
        onChangeText={setSearch}
      />

      {/* USER FORM */}
      <Text style={styles.sectionHeading}>
        {editingUserId ? 'Update User' : 'Add User'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Avatar URL (optional)"
        value={avatar}
        onChangeText={setAvatar}
      />

      <Button
        title={editingUserId ? 'Update User' : 'Add User'}
        onPress={handleSubmit}
      />

      {editingUserId && (
        <View style={styles.cancelButton}>
          <Button
            title="Cancel Editing"
            color="gray"
            onPress={clearForm}
          />
        </View>
      )}

      {/* USER LIST */}
      <Text style={styles.sectionHeading}>
        Saved Users ({users.length})
      </Text>

      {loading ? (
        <Text>Loading users...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUser}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No users found.
            </Text>
          }
        />
      )}
    </View>
  );
};

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  userCard: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },

  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  cancelButton: {
    marginTop: 8,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default UsersScreen;
```

## 3. Integrate the screen into your application

If you're using React Navigation, register `UsersScreen` in your existing navigator.

For example, with a native stack:

```jsx
import UsersScreen from '../screens/UsersScreen';

// Inside your Stack.Navigator:

<Stack.Screen
  name="Users"
  component={UsersScreen}
/>
```

If you don't have navigation configured yet, you can temporarily render it directly in `App.jsx`:

```jsx
import React from 'react';
import UsersScreen from './src/screens/UsersScreen';

const App = () => {
  return <UsersScreen />;
};

export default App;
```

Use one approach, not both.

## 4. Understand how the operations work

These are the important NitromelonDB operations behind the screen.

### A. Create

```javascript
await database.write(async () => {
  await database.get('users').create((user) => {
    user.name = 'John Doe';
    user.email = 'john@example.com';
    user.avatar = null;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
  });
});
```

`create()` inserts a new record into SQLite.

### B. Read

```javascript
const users = await database.get('users').query().fetch();
```

This retrieves all users.

To retrieve a particular user:

```javascript
const user = await database.get('users').find(userId);
```

### C. Update

```javascript
await database.write(async () => {
  const user = await database.get('users').find(userId);

  await user.update((record) => {
    record.name = 'Jane Doe';
    record.updatedAt = Date.now();
  });
});
```

You first retrieve the record, then update its properties.

### D. Delete

```javascript
await database.write(async () => {
  const user = await database.get('users').find(userId);

  await user.destroyPermanently();
});
```

This permanently removes the record from the local database.

If you eventually implement server synchronization, use `markAsDeleted()` instead so the deletion can be synchronized.

### E. Search

```javascript
import { Q } from 'nitromelondb';

const users = await database.get('users').query(
  Q.or(
    Q.where('name', Q.like('%john%')),
    Q.where('email', Q.like('%john%')),
  ),
).fetch();
```

This searches both columns.

Notice that we use `Q.sanitizeLikeString()` in the screen to safely handle user-entered search terms.

---

## 5. Test the implementation

Start the application:

```bash
npx react-native run-android \
  --active-arch-only \
  --main-activity MainActivityDefault
```

Test in this order:

1. Add John Doe with `john@example.com`.
2. Add Jane Doe with `jane@example.com`.
3. Search for `john`.
4. Edit John's name to `John Smith`.
5. Delete Jane.
6. Close and reopen the application.
7. Confirm John Smith is still there.

The last step is particularly important: it verifies that the records are persisted in SQLite rather than merely stored in React state.

**A note about this example:** The screen manually fetches records after each write. That's perfectly fine for learning CRUD. Later, we can use NitromelonDB's observable queries to have the UI update automatically when records change, without manually calling `getUsers()`.

Documentation:
- [NitromelonDB GitHub repository](https://github.com/StasDoskalenko/NitromelonDB?utm_source=chatgpt.com)
- [WatermelonDB CRUD documentation](https://watermelondb.dev/docs/CRUD?utm_source=chatgpt.com)
- [WatermelonDB Query documentation](https://watermelondb.dev/docs/Query?utm_source=chatgpt.com)

**Before running the screen:** One thing worth checking is that your actual `schemas/index.js` exports `schema` as its default export and your `database/index.js` exists with the adapter configuration above.