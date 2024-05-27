import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsArray()
  @IsOptional()
  monitorIds?: number[];
}
