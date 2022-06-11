import * as yup from "yup";

const schema = yup
  .object({
    start: yup.string().required("").typeError(""),
    end: yup.string().required("").typeError(""),
    employeeId: yup.string().required(""),
  })
  .required("");

export default schema;
