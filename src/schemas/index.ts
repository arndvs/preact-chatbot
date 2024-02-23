import * as z from 'zod';

export const UserInputSchema = z.object({
  message: z.string().min(1)
});
