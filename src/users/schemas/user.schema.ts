// src/users/schemas/user.schema.ts
import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface User extends Document {
  email: string;
  password: string;
  createdAt: Date;
  toObject(): any; // Add this line to include the `toObject` method
}
