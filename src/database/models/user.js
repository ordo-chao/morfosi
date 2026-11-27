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