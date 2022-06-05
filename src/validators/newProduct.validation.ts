import * as yup from "yup";

const name_pattern = /^[а-яёА-ЯЁA-Za-z]([а-яёА-ЯЁA-Za-z.]|(\s[а-яёА-ЯЁA-Za-z]))+$/g;
const description_pattern = /^([\dа-яёА-ЯЁA-Za-z.,-]|(\s[\dа-яёА-ЯЁA-Za-z.,-]))*$/g;

const schema = yup
  .object({
    name: yup.string().matches(name_pattern, "Неверный формат!"),
    description: yup
      .string()
      .matches(description_pattern, "Неверный формат!")
      .notRequired()
      .default(undefined),
    amount: yup
      .number()
      .integer("Должно быть целее число!")
      .transform((value) => (isNaN(value) ? undefined : value))
      .default(0),
    price: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .default(0),
  })
  .required();

export default schema;
