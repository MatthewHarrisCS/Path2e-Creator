import { Module } from '@nestjs/common';
import { DebugController } from './controller/debug.controller';
import { DebugService } from './service/debug.service';
import { Ancestry, AncestrySchema } from 'src/schemas/ancestry';
import { MongooseModule } from '@nestjs/mongoose';
import { Background, BackgroundSchema } from 'src/schemas/background';
import { Class, ClassSchema } from 'src/schemas/class';
import { Heritage, HeritageSchema } from 'src/schemas/heritage';
import { Racket, RacketSchema } from 'src/schemas/racket';
import { CharacterSchema, CharacterSheet } from 'src/schemas/characterSheet';

@Module({
  imports: [MongooseModule.forFeature(
    [
      { 
        name: Ancestry.name, 
        schema: AncestrySchema 
      },
      { 
        name: Background.name, 
        schema: BackgroundSchema 
      },
      { 
        name: Class.name, 
        schema: ClassSchema 
      },
      { 
        name: Heritage.name, 
        schema: HeritageSchema
      },
      { 
        name: Racket.name, 
        schema: RacketSchema 
      },
      { 
        name: CharacterSheet.name, 
        schema: CharacterSchema
      }
    ])],
  controllers: [DebugController],
  providers: [DebugService]
})
export class DebugModule {}
