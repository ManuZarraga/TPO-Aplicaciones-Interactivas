import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDTO {
  @Expose()
  readonly userId: number;

  @Expose()
  readonly email: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly role: string;
}
