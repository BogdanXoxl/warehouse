import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required("Email - обязательное поле").email("Введите пожалуйста email!"),
    password: yup.string().required("Введите пожалуйста пароль!"),
  })
  .required();

export default schema;
