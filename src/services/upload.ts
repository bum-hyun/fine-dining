import { useMutation } from '@tanstack/react-query';

import { postFileUploadApi } from '@/services/restaurant/api';

export const usePostFile = () =>
  useMutation({
    mutationKey: ['usePostFile'],
    mutationFn: (searchParams: IUploadFileParams) => postFileUploadApi(searchParams),
  });
