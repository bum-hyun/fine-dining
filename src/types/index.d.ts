interface IRestaurant {
  id: number;
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
  status: string;
}

interface IPostRestaurant {
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
}

interface IPutRestaurant extends IEditRestaurant {
  id: number;
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
  id: string;
  provider?: string;
}

interface IRestaurantReview {
  id: number;
  created_at: string;
  restaurant_id: number;
  title: string;
  editor_html: string;
  editor_object: {
    blocks: { id: string; type: string; data: { [key: string]: string | number } }[];
    time: number;
    version: string;
  };
  updated_at: string;
  deleted_at: string;
  files: string[];
  text: string;
  writer: IRestaurantReviewWriter;
}

interface IPostRestaurantReview {
  restaurant_id: number;
  title: string;
  editor_html: string;
  editor_object: OutputData;
  user_id: string;
  files: string[];
  text: string;
}

interface IPutRestaurantReview extends IPostRestaurantReview {
  id: number;
}

interface IRestaurantReviewWriter {
  id: string;
  email: string;
  nickname: string;
}

interface IRestaurantName {
  id: number;
  name: string;
  status: string;
}
