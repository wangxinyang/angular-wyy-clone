import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServicesModule, API_URL_PREFIX } from "./services.module";
import { map } from "rxjs/internal/operators";
import { ISinger } from "./dataTypes/common.types";
import { stringify } from "querystring";

interface ISingerParam {
  limit: number;
  offset: number;
  type: number;
  area: number;
}

const defaultSingerParam: ISingerParam = {
  limit: 9,
  offset: 0,
  type: -1,
  area: -1,
};

@Injectable({
  providedIn: ServicesModule,
})
export class SingerService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL_PREFIX) private uri: string
  ) {}

  // 获取首页右侧歌手数据
  getSingers(
    singerParams: ISingerParam = defaultSingerParam
  ): Observable<ISinger[]> {
    const params = new HttpParams({
      fromString: stringify(singerParams),
    });
    return this.http
      .get(this.uri + "artist/list", { params })
      .pipe(map((res: { artists: ISinger[] }) => res.artists));
  }
}
