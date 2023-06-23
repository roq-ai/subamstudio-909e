import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMedia } from 'apiSdk/media';
import { Error } from 'components/error';
import { mediaValidationSchema } from 'validationSchema/media';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ProjectInterface } from 'interfaces/project';
import { getProjects } from 'apiSdk/projects';
import { MediaInterface } from 'interfaces/media';

function MediaCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MediaInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMedia(values);
      resetForm();
      router.push('/media');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MediaInterface>({
    initialValues: {
      file_name: '',
      file_type: '',
      project_id: (router.query.project_id as string) ?? null,
    },
    validationSchema: mediaValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Media
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="file_name" mb="4" isInvalid={!!formik.errors?.file_name}>
            <FormLabel>File Name</FormLabel>
            <Input type="text" name="file_name" value={formik.values?.file_name} onChange={formik.handleChange} />
            {formik.errors.file_name && <FormErrorMessage>{formik.errors?.file_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="file_type" mb="4" isInvalid={!!formik.errors?.file_type}>
            <FormLabel>File Type</FormLabel>
            <Input type="text" name="file_type" value={formik.values?.file_type} onChange={formik.handleChange} />
            {formik.errors.file_type && <FormErrorMessage>{formik.errors?.file_type}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ProjectInterface>
            formik={formik}
            name={'project_id'}
            label={'Select Project'}
            placeholder={'Select Project'}
            fetcher={getProjects}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'media',
  operation: AccessOperationEnum.CREATE,
})(MediaCreatePage);
