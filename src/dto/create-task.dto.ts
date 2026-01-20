import { IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @MaxLength(255)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: string;
}
