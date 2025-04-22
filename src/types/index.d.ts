type TRestaurantStatus = 'active' | 'pending' | 'rejected';

interface IRestaurant {
  id: number;
  name: string | null;
  address: string | null;
  email: string | null;
  description: string | null;
  is_only_course: boolean;
  tel: string | null;
  reservation_url: string | null;
  tags: string[] | null;
  launch_price: number | null;
  dinner_price: number | null;
  thumbnail: string | null;
  currency: string | null;
  status: TRestaurantStatus;
}

interface IPostRestaurant {
  name: string | null;
  address: string | null;
  email: string | null;
  description: string | null;
  is_only_course: boolean | null;
  tel: string | null;
  reservation_url: string | null;
  tags: string[] | null;
  launch_price: number | null;
  dinner_price: number | null;
  currency: string | null;
  thumbnail: string | null;
  status?: TRestaurantStatus;
}

interface IPutRestaurant extends IPostRestaurant {
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
  restaurant_id: number | null;
  title: string | null;
  editor_html: string | null;
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
  restaurant: Pick<IRestaurant, 'id' | 'name' | 'tags'>;
}

interface IPostRestaurantReview {
  restaurant_id: number;
  title: string | null;
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

interface IGetRestaurantsParams {
  world?: string;
  star?: number;
  page: number;
  limit?: number;
  status?: TRestaurantStatus | 'all';
}

interface IGetRestaurantReviewsParams {
  restaurantId: number;
  page: number;
  limit?: number;
  status?: TRestaurantStatus | 'all';
}
