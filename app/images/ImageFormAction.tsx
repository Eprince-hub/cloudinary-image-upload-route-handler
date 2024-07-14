'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '../Components/SubmitButton';
import ErrorMessage from '../ErrorMessage';
import { uploadImage } from './action';

export default function ImageFormAction({
  buttonTitle,
  formTitle,
}: {
  buttonTitle: string;
  formTitle: string;
}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [fileData, setFileData] = useState<Blob>();

  const [state, formAction] = useFormState(
    (state: { error: string } | null | undefined, formData: FormData) =>
      uploadImage(formData),
    null,
  );

  useEffect(() => {
    if (state === undefined) {
      setSuccessMessage('Image uploaded successfully');
    }
  }, [state]);

  return (
    <div>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <strong className="block mb-6">{formTitle}</strong>
      <form
        // It can also be done with the action prop
        // action={formAction}
        className="flex flex-col justify-center gap-6 max-w-sm mx-auto"
      >
        <label>
          Select Image:
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files) {
                setFileData(event.currentTarget.files?.[0]);
              }
            }}
          />
        </label>
        {/* <SubmitButton buttonTitle={buttonTitle} formAction={uploadImage} /> */}
        <SubmitButton
          buttonTitle={buttonTitle}
          formAction={() => {
            const formData = new FormData();
            if (fileData) {
              formData.append('image', fileData);
            }

            formAction(formData);
          }}
        />
      </form>
      {state && 'error' in state && state.error ? (
        <ErrorMessage>{state.error}</ErrorMessage>
      ) : null}
    </div>
  );
}
