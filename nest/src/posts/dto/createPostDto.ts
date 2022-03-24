import {IsString} from "class-validator";

const STRING_VALIDATION_MESSAGE = "Must be string";

export class CreatePostDto {
  @IsString({message: STRING_VALIDATION_MESSAGE})
  readonly title: string;
  @IsString({message: STRING_VALIDATION_MESSAGE})
  readonly content: string;
  readonly image: string;

  readonly userId: number;
}