import { IsOptional, IsString, MaxLength, IsBoolean, IsDateString } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsDateString()
    dueDate?: string; 
}
