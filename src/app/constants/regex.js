export const PASSWORD_VALID =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const FIRSTNAME = /^[a-zA-ZÀ-ÿ\-]+$/;

export const LASTNAME = /^[a-zA-ZÀ-ÿ\s\-]+$/;

export const PROJECT_NAME = /^.{3,50}$/;

export const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ONLY_ALPHA = /^[a-zA-ZÀ-ÿ\s\-]+$/;