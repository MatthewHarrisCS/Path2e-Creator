import { CreateCharacterDto } from "./createCharacter.dto";

export class GetCharactersDto {
    characters: CreateCharacterDto[];
    user: string;
}