import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Banner } from "./dataTypes/common.types";
import { ServicesModule, API_URL_PREFIX } from "./services.module";
import { map } from "rxjs/internal/operators";

@Injectable({
  providedIn: ServicesModule,
})
export class HomeService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL_PREFIX) private uri: string
  ) {}

  // 获取轮播图
  getBanners(): Observable<Banner[]> {
    return this.http
      .get(this.uri + "banner")
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }
}
