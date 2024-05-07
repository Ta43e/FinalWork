import { connect, disconnect, model } from 'mongoose';
import { VinylDocument, VinylSchema, Vinyl } from '../src/schemas/Vinyl.shema';
import { config } from 'dotenv';

config();

const VinylModel = model<VinylDocument>('Vinyl', VinylSchema);

async function populateVinyls() {
    try {
        await connect(process.env.MONGODB_URI);

        const vinylData: Vinyl[] = [];
        for (let i = 1; i <= 50; i++) {
            vinylData.push({
                name: `Vinyl ${i}`,
                authorName: `Author ${i}`,
                photo: `photo${i}.jpg`,
                description: `Description for Vinyl ${i}`,
                price: 10 + i,
            });
        }

        const createdVinyls = await VinylModel.create(vinylData);
        console.log('Данные Vinyl успешно добавлены:', createdVinyls);
    } catch (error) {
        console.error('Ошибка при выполнении миграции:', error);
    } finally {
        await disconnect();
    }
}

populateVinyls();
