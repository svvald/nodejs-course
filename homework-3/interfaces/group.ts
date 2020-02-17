export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupInputDTO {
  name: string;
  permissions: Array<Permission>;
}

export interface Group extends GroupInputDTO {
  id: number;
}
