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
  currency: string;
}

interface IModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface IUser {
  name: string;
  email: string;
  nickname: string;
  avatar_url: string;
  role?: string;
  id?: string;
  provider?: string;
}
