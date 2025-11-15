export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type Users = User[];

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  NO_CONTENT = 204,
}
