import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {
    @ApiProperty({
        default: 10,
        description: 'How many rows do you need',
        required: false,
        type: Number,
        example: 10
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number) //!LO MISMO QUE enableImplicitConversions: true, del app.module
    limit?: number

    @ApiProperty({
        default: 0,
        description: 'How many rows do you want to skip',
        required: false,
        type: Number,
        example: 0
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)

    offset?: number
}