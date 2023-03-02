/**
 * Result either contains an error object or a session if successfully authenticated.
 */
export type LoginResult =
  | { error: { code: number; data: any }; success?: undefined }
  | { error?: undefined; success: { session: string } };

/**
 * Contains authentication functionality such as registration, login, signout, etc.
 */
export interface Auth {
  randomizer: UIDRandomizer;
  encrypter: Encrypter;
  /**
   * Authenticates the user and returns a session token or an error object with proper HTTP code.
   * @param form the authentication data submitted by a user. Should include 'username' and 'password'
   */
  login(form: FormData): Promise<LoginResult>;
}

export interface UIDRandomizer {
  generate_unique_id(): string;
}

export interface Encrypter {
  hash(password: string, salt: string): string;
}
