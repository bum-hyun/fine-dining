interface IRestaurant {
  id: number;
  name: string;
  description: string;
}

interface IUploadFileParams {
  file: File;
  width?: number;
  height?: number;
  thumbUrl?: string;
}

interface IFile {
  id: string;
  preSignedUrl: string;
  name: string;
  type: string;
  width?: number;
  height?: number;
  size: number;
  url: string;
}

interface IModalProps {
  visible?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
