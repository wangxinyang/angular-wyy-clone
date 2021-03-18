import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServicesModule, API_URL_PREFIX } from "./services.module";
import { map, pluck, switchMap } from "rxjs/internal/operators";
import { IPlaySong, ISongSheet } from "./dataTypes/common.types";
import { SongService } from "./song.service";

@Injectable({
  providedIn: ServicesModule,
})
export class SheetService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL_PREFIX) private uri: string,
    private songService: SongService
  ) {}

  // 获取某个歌单的数据
  getPlaylist(id: number): Observable<ISongSheet> {
    const params = new HttpParams().set("id", id.toString());
    return this.http
      .get(this.uri + "playlist/detail", { params })
      .pipe(map((res: { playlist: ISongSheet }) => res.playlist));
  }

  // 获取播放的歌单以及它的播放地址
  getPlaySong(id: number): Observable<IPlaySong[]> {
    return this.getPlaylist(id).pipe(
      pluck("tracks"),
      switchMap((tracks) => this.songService.getSong(tracks))
    );
  }
}
