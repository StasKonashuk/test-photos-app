import * as yup from 'yup';

export const postCommentSchema = yup.object().shape({
  text: yup.string().required('Text is required'),
});
