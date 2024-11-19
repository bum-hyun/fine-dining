import ky from 'ky';

import { api } from '@/services/api';

export const postFileUploadApi = async ({ file, ...restParams }: IUploadFileParams) => {
  const params = {
    name: file.name,
    type: file.type,
    size: file.size,
    ...restParams,
  };
  const { preSignedUrl, ...rest } = await api.post<IFile>('api/upload', { json: params }).json();
  await putPreSignedUrl(preSignedUrl, file);
  return rest;
};

export const putPreSignedUrl = async (preSignedUrl: string, file: File) => {
  await ky
    .put(preSignedUrl, {
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })
    .json();
};
