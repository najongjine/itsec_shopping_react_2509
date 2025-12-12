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
