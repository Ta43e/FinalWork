import { VinylService } from './vinyl.service';
import { QueryVinylDto } from './dto/query-vinyl.dto';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { SearchVinylDto } from './dto/search-vinyl.dto';
import { SortVinylDto } from './dto/sort-vinyl.dto';
export declare class VinylController {
    private VinylService;
    constructor(VinylService: VinylService);
    showAllVinyl(query: QueryVinylDto): Promise<import("./vinyl.interface").InformationVinyl[]>;
    addVinyl(res: any, createVinylDto: CreateVinylDto): Promise<void>;
    deleteVinyl(res: any, id: string): Promise<void>;
    updateVinyl(res: any, id: string, updateVinylDto: UpdateVinylDto): Promise<void>;
    searchVinyl(res: any, searchVinylDto: SearchVinylDto): Promise<any>;
    sortVinyl(res: any, sortVinylDto: SortVinylDto): Promise<any>;
}
