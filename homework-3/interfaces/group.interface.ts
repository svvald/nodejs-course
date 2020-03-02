export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES',
}

export interface GroupInputDTO {
  name: string;
  permissions: Array<Permission>;
}

export interface Group extends GroupInputDTO {
  id: string;
}
