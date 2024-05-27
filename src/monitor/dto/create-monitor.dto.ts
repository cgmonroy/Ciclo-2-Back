import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMonitorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  cursoId: number;
}
