export interface RequestForm {
  name: string;
  email: string;
}

export type RequestErrors = Partial<Record<keyof RequestForm, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateRequest(form: RequestForm): RequestErrors {
  const errors: RequestErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();

  if (name === "") errors.name = "Укажите ФИО";
  else if (name.split(/\s+/).length < 2) errors.name = "Укажите фамилию и имя";
  else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name))
    errors.name = "ФИО может содержать только буквы";

  if (email === "") errors.email = "Укажите почту";
  else if (!EMAIL_RE.test(email)) errors.email = "Некорректный адрес почты";

  return errors;
}
