import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateCursoDto {
  @IsString()
  nombre?: string;

  @IsString()
  descripcion?: string;
}
