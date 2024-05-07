/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from 'mongoose';
import { Review } from 'src/schemas/Review.shema';
import { User } from 'src/schemas/User.schema';
import { Vinyl, VinylDocument } from 'src/schemas/Vinyl.shema';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { QueryVinylDto } from './dto/query-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { SearchVinylDto } from './dto/search-vinyl.dto';
import { SortVinylDto } from './dto/sort-vinyl.dto';
import { LogerService } from '../loger/loger.service';
import { InformationVinyl } from './vinyl.interface';
export declare class VinylService {
    private userModel;
    private vinylModel;
    private reviewModel;
    private LogerService;
    constructor(userModel: Model<User>, vinylModel: Model<Vinyl>, reviewModel: Model<Review>, LogerService: LogerService);
    showAllVinyl(query: QueryVinylDto): Promise<InformationVinyl[]>;
    private showMoreInformationAboutVinyl;
    createVinyl(createVinylDto: CreateVinylDto): Promise<VinylDocument>;
    updateVinyl(_id: Types.ObjectId, vinylDto: UpdateVinylDto): Promise<VinylDocument>;
    deleteVinyl(_id: Types.ObjectId): Promise<VinylDocument>;
    searchVinyl(searchVinylDto: SearchVinylDto): Promise<InformationVinyl[]>;
    sortVinyl(sortVinylDto: SortVinylDto): Promise<InformationVinyl[]>;
}
