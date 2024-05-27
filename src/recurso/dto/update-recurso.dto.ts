import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class UpdateRecursoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  tipo?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  cursoId?: number;
}
