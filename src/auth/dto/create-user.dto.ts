import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
        description: 'User email address (must be unique)',
        example: 'john.doe@google.com',
        format: 'email'
    })
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'User password. Must contain at least one uppercase letter, one lowercase letter, and one number or special character.',
        example: 'Abc123456',
        minLength: 6,
        maxLength: 50,
        format: 'password'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    fullName: string
}