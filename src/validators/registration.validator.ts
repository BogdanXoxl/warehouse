import * as yup from "yup";

const password_pattern =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/g;
const name_pattern = /(^[А-ЯЁ]?[а-яё]+$)|(^[A-Z]?[a-z]+$)/g;

const schema = yup
  .object({
    name: yup.string().matches(name_pattern, "Неверный формат!"),
    surname: yup.string().matches(name_pattern, "Неверный формат!"),
    email: yup.string().required("Email - обязательное поле").email("Введите пожалуйста email!"),
    carierStart: yup.string().nullable(),
    password: yup
      .string()
      .required("Введите пожалуйста пароль!")
      .matches(
        password_pattern,
        "Пароль должен содержать только цифры, спец. символы и строчные/заглавные буквы латинского алфавита!"
      ),
  })
  .required();

export default schema;
