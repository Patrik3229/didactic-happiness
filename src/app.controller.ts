import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService
  ) { }

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('bills')
  bills() {
    return this.prismaService.szamla.findMany();
  }

  @Get('bills/id/:id')
  async oneBill(@Param('id') id: string) {
    return await this.prismaService.szamla.findFirstOrThrow({
      where: {
        id: parseInt(id)
      }
    })
  }

  @Get('bills/type/:type')
  async oneType(@Param('type') type: string) {
    return await this.prismaService.szamla.findFirstOrThrow({
      where: {
        type: type
      }
    })
  }

  @Get('bills/urgent')
  async oneUrgent() {
    return await this.prismaService.szamla.findFirst({
      orderBy: {
        due: 'asc'
      }
    })
  }
}