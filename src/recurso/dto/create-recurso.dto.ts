import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateRecursoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsInt()
  @IsNotEmpty()
  cursoId: number;
}
