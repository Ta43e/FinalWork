import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogerDocument = HydratedDocument<Loger>

@Schema()
export class Loger {
    @Prop({ required: true })
    entity: string;

    @Prop({ required: true })
    operation: string;

    @Prop({ required: true })
    data: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const LogerSchema = SchemaFactory.createForClass(Loger);
