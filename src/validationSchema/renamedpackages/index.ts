import * as yup from 'yup';

export const renamedpackageValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  price: yup.number().integer().required(),
  studio_id: yup.string().nullable(),
});
