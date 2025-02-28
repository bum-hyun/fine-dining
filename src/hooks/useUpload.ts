import { useCallback, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { useUploadFile } from '@/services/common/commonService';
import { convertHeic } from '@/utils/heicConvertor';
import { generateThumbnail } from '@/utils/thumbnailGenerator';

interface IUseUpload {
  maxLength?: number;
  onResult?: (file: any) => void;
}

export const useUpload = ({ maxLength, onResult }: IUseUpload) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  const [attachmentList, setAttachmentList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const imageUploadCount = useRef<number>(0);
  const imageUploadProgressText = useRef<string>('');
  const imageUploadProgressValue = useRef<number>(0);

  const { mutateAsync: uploadImageMutate } = useUploadFile();

  const attachmentCount = useMemo(() => {
    return attachmentList.length;
  }, [attachmentList]);

  const handleAddAttachmentButton = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current?.click();
  }, []);

  const handleAddAttachment = useCallback(
    async (files: FileList | null) => {
      if (!files) return;
      setIsLoading(true);
      const tempImages = [...(attachmentList || [])];
      const imageLength = attachmentList?.length || 0;
      const filesLength = files.length;
      let cutFiles = Array.from(files);

      if (maxLength && imageLength + filesLength > maxLength) {
        alert(`업로드는 ${maxLength}장까지만 가능합니다.`);
        cutFiles = Array.from(files).slice(0, maxLength - imageLength);
      }
      imageUploadProgressText.current = '파일을 업로드 중입니다.';
      const convertedFiles = await Promise.all(cutFiles.map((file) => convertHeic(file)));

      imageUploadCount.current = convertedFiles.length;
      imageUploadProgressText.current = `${convertedFiles.length - imageUploadCount.current + 1} / ${convertedFiles.length}`;
      imageUploadProgressValue.current = Math.round(((convertedFiles.length - imageUploadCount.current) / convertedFiles.length) * 100);

      try {
        convertedFiles.map(async (file, index) => {
          const reader = new FileReader();
          reader.onload = async function (e) {
            let thumbUrl = '';
            const isVideo = file!.type.includes('video');
            if (isVideo) {
              const thumbnailFile = await generateThumbnail(file!);
              const thumbnailResult = await uploadImageMutate({
                file: thumbnailFile,
              });
              thumbUrl = thumbnailResult.url;
            }

            const img = new Image();
            img.src = isVideo ? thumbUrl : (e.target?.result as string);
            img.onload = async function () {
              const result = await uploadImageMutate({ file: file!, width: img.width, height: img.height, thumbUrl });
              const newImage = {
                ...result,
                sortOrder: imageLength + index,
              };

              imageUploadCount.current -= 1;
              imageUploadProgressText.current = `${convertedFiles.length - imageUploadCount.current} / ${convertedFiles.length}`;
              imageUploadProgressValue.current = Math.round(((convertedFiles.length - imageUploadCount.current) / convertedFiles.length) * 100);

              setAttachmentList((prev) => [...prev, newImage]);
              if (onResult) {
                onResult(newImage);
              }
              tempImages.push(newImage);
              if (imageUploadCount.current === 0) {
                setIsLoading(false);
                imageUploadCount.current = 0;
                imageUploadProgressText.current = '';
                imageUploadProgressValue.current = 0;
                setAttachmentList([...tempImages].sort((a, b) => a.sortOrder - b.sortOrder));
              }
            };
          };
          reader.readAsDataURL(file!);
        });
      } catch (e: any) {
        setIsLoading(false);
        imageUploadCount.current = 0;
        imageUploadProgressText.current = '';
        imageUploadProgressValue.current = 0;
        alert(`에러가 발생했습니다.: ${e.toString()}`);
      } finally {
        inputRef.current!.value = '';
        if (inputRef2 && inputRef2.current) {
          inputRef2.current.value = '';
        }
      }
    },
    [maxLength, attachmentList, setAttachmentList, uploadImageMutate]
  );

  const handleRemoveImage = useCallback(
    (item: ICommonFile) => {
      const newAttachmentList = attachmentList.filter((image) => image !== item);
      setAttachmentList(newAttachmentList);
    },
    [attachmentList]
  );

  return { inputRef, inputRef2, isLoading, attachmentCount, attachmentList, setAttachmentList, handleAddAttachmentButton, handleAddAttachment, handleRemoveImage };
};
