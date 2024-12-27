import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email({ message: '이메일 형태로 입력해주세요.' }),
  password: z.string().min(8, { message: '8글자 이상 입력해주세요.' }),
  token: z.string().optional(),
});

export const TodoSchema = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
