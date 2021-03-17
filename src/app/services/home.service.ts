import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IBanner, IHotTag, IPersonalized } from "./dataTypes/common.types";
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
  getBanners(): Observable<IBanner[]> {
    return this.http
      .get(this.uri + "banner")
      .pipe(map((res: { banners: IBanner[] }) => res.banners));
  }

  // 获取热门歌单标签
  getHotTags(): Observable<IHotTag[]> {
    return this.http.get(this.uri + "playlist/hot").pipe(
      map((res: { tags: IHotTag[] }) => {
        return res.tags
          .sort((x: IHotTag, y: IHotTag) => x.position - y.position)
          .slice(0, 5);
      })
    );
  }

  // 获取热门歌单
  getPersonalized(): Observable<IPersonalized[]> {
    return this.http
      .get(this.uri + "personalized")
      .pipe(map((res: { result: IPersonalized[] }) => res.result.slice(0, 16)));
  }
}
