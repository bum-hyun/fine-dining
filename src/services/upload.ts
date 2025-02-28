import { useMutation } from '@tanstack/react-query';

export const useUploadFile = () =>
  useMutation({
    mutationKey: ['file_upload'],
    mutationFn: ({ file, width, height, thumbUrl }: { file: File; width?: number; height?: number; thumbUrl?: string }) => uploadFileApi(file, width, height, thumbUrl),
  });
