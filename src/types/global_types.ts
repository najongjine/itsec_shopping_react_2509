export interface UserInfoType {
  id: number;
  username: string;
  password: string;
  createdDt: string;
  updatedDt: string;
  realName: string;
  profileUrl: string;
  uid: string;
  email: string;
  displayName: string;
  providerId: string;
  metadata: string;
  token: string;
}

export interface ProductCategoryType {
  id?: number;
  categoryName?: string;
  createdDt?: string;
  updatedDt?: string;
}

export interface ProductType {
  product_id?: number;
  user_id?: number;
  username?: number;
  imgurl?: string;
  product_name?: string;
  created_dt?: string;
  updated_dt?: string;
}
