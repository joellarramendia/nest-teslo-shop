import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"

export class CreateProductDto {
    @ApiProperty({
        description: 'Product title (unique)',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string

    @ApiProperty({
        description: 'Product price',
        example: 29.99,
        required: false,
        default: 0
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number

    @ApiProperty({
        description: 'Product description',
        example: 'A comfortable cotton shirt perfect for daily wear.',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({
        description: 'Product slug for SEO/URL',
        example: 'teslo_cool_shirt',
        required: false
    })
    @IsString()
    @IsOptional()
    slug?: string

    @ApiProperty({
        description: 'Product stock quantity',
        example: 10,
        default: 0,
        required: false
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number

    @ApiProperty({
        description: 'Available product sizes',
        example: ['S', 'M', 'L', 'XL'],
        type: [String]
    })
    @IsString({each: true})
    @IsArray()
    sizes: string[]

    @ApiProperty({
        description: 'Target gender for the product',
        enum: ['men', 'women', 'kid', 'unisex'],
        example: 'men'
    })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string

    @ApiProperty({
        description: 'Product tags for search and categorization',
        example: ['shirt', 'apparel', 'summer'],
        type: [String],
        required: false
    })
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    tags: string[]

    @ApiProperty({
        description: 'Array of image URLs or filenames',
        example: ['1733321-00-A_0_2000.jpg', '1733321-00-A_1.jpg'],
        type: [String],
        required: false
    })
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images?: string[]
}

