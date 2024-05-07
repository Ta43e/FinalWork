"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Vinyl_shema_1 = require("../src/schemas/Vinyl.shema");
const dotenv_1 = require("dotenv");
const User_schema_1 = require("../src/schemas/User.schema");
const role_guard_1 = require("../src/guard/role.guard");
(0, dotenv_1.config)();
const VinylModel = (0, mongoose_1.model)('Vinyl', Vinyl_shema_1.VinylSchema);
const UserModule = (0, mongoose_1.model)('User', User_schema_1.UserSchema);
async function populateVinyls() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URI);
        const vinylData = [];
        for (let i = 1; i <= 50; i++) {
            vinylData.push({
                name: `Vinyl ${i}`,
                authorName: `Author ${i}`,
                photo: `photo${i}.jpg`,
                description: `Description for Vinyl ${i}`,
                price: 10 + i,
            });
        }
        const admin = await UserModule.findOne({ role: role_guard_1.Role.Admin });
        if (!admin) {
            const adminUser = {
                email: 'admin@admin.admin',
                firstName: 'admin',
                lastName: 'admin',
                photo: 'admin',
                vinylList: [],
                birthdate: new Date(),
                role: role_guard_1.Role.Admin,
            };
            UserModule.create(adminUser);
        }
        const createdVinyls = await VinylModel.create(vinylData);
        console.log('Success:', createdVinyls);
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await (0, mongoose_1.disconnect)();
    }
}
populateVinyls();
//# sourceMappingURL=InitialSeed.js.map