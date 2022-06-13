declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    DATABASE_URL: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
  }
}
