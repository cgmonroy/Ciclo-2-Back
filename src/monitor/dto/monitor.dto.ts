import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMonitorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;
}

export class UpdateMonitorDto {
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsEmail()
  email?: string;
}
