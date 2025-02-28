export const convertHeic = async (file: File) => {
  const heic2any = (await import('heic2any')).default;
  try {
    if (file.type === 'heic') {
      const result = (await heic2any({ blob: file, toType: 'image/jpeg' })) as any;
      return new File([result], file.name.split('.')[0] + '.jpg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      });
    } else {
      return file;
    }
  } catch (e) {
    console.log(e);
  }
};
