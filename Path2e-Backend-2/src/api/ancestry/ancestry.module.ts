import { Module } from '@nestjs/common';
import { Ancestry, AncestrySchema } from 'src/schemas/ancestry';
import { AncestryController } from './controller/ancestry.controller';
import { AncestryService } from './service/ancestry.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ancestry.name, schema: AncestrySchema }])],
  controllers: [AncestryController],
  providers: [AncestryService]
})
export class AncestryModule {}
