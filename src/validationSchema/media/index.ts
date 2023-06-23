import * as yup from 'yup';

export const mediaValidationSchema = yup.object().shape({
  file_name: yup.string().required(),
  file_type: yup.string().required(),
  project_id: yup.string().nullable(),
});
