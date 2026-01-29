'use server';

import { authService } from '@/services/auth/auth.service';
import { registerSchema } from '@/utils/validation';

export async function registerAction(formData: unknown) {
  const data = formData instanceof FormData
    ? {
        email: formData.get('email') ?? '',
        password: formData.get('password') ?? '',
        name: (formData.get('name') as string)?.trim() || undefined,
      }
    : formData;
  const parsed = registerSchema.parse(data);
  const user = await authService.register(parsed);
  return { success: true, user };
}
