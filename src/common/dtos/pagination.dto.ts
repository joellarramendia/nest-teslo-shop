import { Type } from "class-transformer"
import { IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) //!LO MISMO QUE enableImplicitConversions: true, del app.module
    limit?: number

    @IsOptional()
    @Min(0)
    @Type(() => Number)

    offset?: number
}