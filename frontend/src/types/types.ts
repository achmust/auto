export type RegisterValues = {
  name: string;
  surname: string;
  email: string;
  tel: string;
  password: string;
};
export type LogInValues = {
  email: string;
  password: string;
};
export type User = {
  fullname: string;
  id: number;
};
export type UserInfo = {
  id: number;
  name: string;
  surname: string;
  tel: string;
  email: string;
};
export type CarType = {
  carbrand: string;
  carmodel: string;
  caryear: string;
  carplate: string;
};
export type ReservationInputsType = {
  date: string;
  time: string;
  description: string;
};
export type ReservationsType = {
  CarId: number;
  Date: string;
  Description: String;
  IsDeleted: number;
  ReservationId: number;
  StatusId: number;
  Time: string;
  UserId: number;
  carbrand: string;
  carmodel: string;
  carplate: string;
  caryear: string;
  id: number;
  color: string;
  isDeleted: number;
  text: string;
  name: string;
  surname: string;
  email: string;
  tel: string;
};
export type CarList = {
  id: number;
  UserId: number;
} & CarType;
