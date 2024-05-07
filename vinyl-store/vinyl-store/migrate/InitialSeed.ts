import { connect, disconnect, model } from 'mongoose';
import { VinylDocument, VinylSchema, Vinyl } from '../src/schemas/Vinyl.shema';
import { config } from 'dotenv';
import { User, UserDocument, UserSchema } from 'src/schemas/User.schema';
import { Role } from 'src/guard/role.guard';

config();

const VinylModel = model<VinylDocument>('Vinyl', VinylSchema);
const UserModule = model<UserDocument>('User', UserSchema);

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
        const admin: UserDocument = await UserModule.findOne({role: Role.Admin})
        if (!admin) {
            const adminUser: User = {
                email: 'admin@admin.admin',
                firstName: 'admin',
                lastName: 'admin',
                photo: 'admin',
                vinylList: [],
                birthdate: new Date(),
                role: Role.Admin,
            }
            UserModule.create(adminUser);
        }

        const createdVinyls = await VinylModel.create(vinylData);
        console.log('Success:', createdVinyls);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await disconnect();
    }
}

populateVinyls();

