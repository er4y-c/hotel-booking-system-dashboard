export interface User {
  name: string;
  surname: string;
  phone: string;
  email: string;
  supabaseUid: string;
  role: string;
  creatorId?: string;
}
