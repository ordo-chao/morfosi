import { schemaMigrations } from 'nitromelondb/Schema/migrations';

const migrations = schemaMigrations({
  migrations: [],
});

export default migrations;

// import { schemaMigrations, addColumns } from 'nitromelondb/Schema/migrations';

// const migrations = schemaMigrations({
//   migrations: [
//     {
//       toVersion: 2,

//       steps: [
//         addColumns({
//           table: 'users',
//           columns: [
//             {
//               name: 'phone',
//               type: 'string',
//               isOptional: true,
//             },
//           ],
//         }),
//       ],
//     },
//   ],
// });

// export default migrations;