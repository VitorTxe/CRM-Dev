export interface AuthState {
  user: {
    uid: string;
    displayname: string | null;
    email: string | null;
    photoURL: string | null;
  } | null;
  error: string | null;
  loading: boolean;
}
