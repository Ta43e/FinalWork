import {
    Controller,
    Get,
    UseGuards,
    Query,
    Post,
    Res,
    Body,
    Delete,
    Put,
    Param,
  } from '@nestjs/common';
import { VinylService } from './vinyl.service';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { QueryVinylDto } from './dto/query-vinyl.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from 'src/guard/role.guard';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { SearchVinylDto } from './dto/search-vinyl.dto';
import { SortVinylDto } from './dto/sort-vinyl.dto';
import { Types } from 'mongoose';
 
    @Controller('vinyl')
    export class VinylController {
    constructor(private VinylService: VinylService) {}
    
    @ApiTags('vinyl')
    @UseGuards(AuthenticationGuard)
    @Get()
    async showAllVinyl(@Query() query: QueryVinylDto) {
      return this.VinylService.showAllVinyl(query);
    }

    
    @ApiTags('vinyl')
    @Roles(['admin'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Post('add')
    async addVinyl(@Res() res, @Body() createVinylDto: CreateVinylDto) {
      const result = await this.VinylService.createVinyl(createVinylDto);
      res.status(200).json(result);
    }

    @ApiTags('vinyl')
    @Roles(['admin'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Delete('delete/:id')
    async deleteVinyl(@Res() res, @Param('id') id: string) {
      const result =  await this.VinylService.deleteVinyl(new Types.ObjectId(id));
      res.status(200).json(result);
    }

    @ApiTags('vinyl')
    @Roles(['admin'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Put('update/:id')
    async updateVinyl(@Res() res, @Param('id') id: string,  @Body() updateVinylDto: UpdateVinylDto) {
      const result = await this.VinylService.updateVinyl(new Types.ObjectId(id), updateVinylDto);
      res.status(200).json(result);
    }

    @ApiTags('vinyl')
    @Roles(['admin', 'user'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Get('search')
    async searchVinyl(@Res() res, @Query() searchVinylDto: SearchVinylDto) {
      const vinyls = await this.VinylService.searchVinyl(searchVinylDto);
      return res.status(200).json(vinyls);
    }

    @ApiTags('vinyl')
    @Roles(['admin', 'user'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Get('sort')
    async sortVinyl(@Res() res, @Query() sortVinylDto: SortVinylDto) {
      const vinyls = await this.VinylService.sortVinyl(sortVinylDto);
      return res.status(200).json(vinyls);
    }
}
  