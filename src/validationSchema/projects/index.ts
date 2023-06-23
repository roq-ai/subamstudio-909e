import * as yup from 'yup';

export const projectValidationSchema = yup.object().shape({
  name: yup.string().required(),
  deadline: yup.date().required(),
  studio_id: yup.string().nullable(),
});
