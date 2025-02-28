interface IRestaurant {
  id?: number;
  name: string;
  address: string;
  email: string;
  description: string;
  is_only_course: boolean;
  tel: string;
  reservation_url: string;
  tags: string[];
  launch_price: number;
  dinner_price: number;
  thumbnail?: string;
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
