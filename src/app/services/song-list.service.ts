import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServicesModule, API_URL_PREFIX } from "./services.module";
import { map } from "rxjs/internal/operators";
import { IPersonalized } from "./dataTypes/common.types";

@Injectable({
  providedIn: ServicesModule,
})
export class SongListService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL_PREFIX) private uri: string
  ) {}

  // 获取某个歌单的数据
  getPlaylist(id: number): Observable<IPersonalized> {
    const params = new HttpParams().set("id", id.toString());
    return this.http
      .get(this.uri + "playlist/detail", { params })
      .pipe(map((res: { playlist: IPersonalized }) => res.playlist));
  }
}
