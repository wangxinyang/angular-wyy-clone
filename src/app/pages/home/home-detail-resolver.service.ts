import { Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  IBanner,
  IHotTag,
  IPersonalized,
  ISinger,
} from "src/app/services/dataTypes/common.types";
import { HomeService } from "src/app/services/home.service";
import { SingerService } from "src/app/services/singer.service";
import { first } from "rxjs/internal/operators";

type HomeDataType = [IBanner[], IHotTag[], IPersonalized[], ISinger[]];

@Injectable()
export class HomeDetailResolverService implements Resolve<HomeDataType> {
  constructor(
    private homeSevice: HomeService,
    private singerService: SingerService
  ) {}

  resolve(): Observable<HomeDataType> {
    return forkJoin([
      this.homeSevice.getBanners(),
      this.homeSevice.getHotTags(),
      this.homeSevice.getPersonalized(),
      this.singerService.getSingers(),
    ]).pipe(first());
  }
}
