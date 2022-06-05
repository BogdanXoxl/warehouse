import * as yup from "yup";

const name_pattern = /(^[А-ЯЁ]?[а-яё]+$)|(^[A-Z]?[a-z]+$)/g;
const description_pattern = /^[а-яёА-ЯЁA-Za-z]([\dа-яёА-ЯЁA-Za-z.,-]|(\s[\dа-яёА-ЯЁA-Za-z.,-]))+$/g;

const schema = yup
  .object({
    name: yup.string().matches(name_pattern, "Неверный формат!"),
    description: yup.string().matches(description_pattern, "Неверный формат!").default(undefined),
    amount: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .default(0),
  })
  .required();

export default schema;
