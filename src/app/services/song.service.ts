import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServicesModule, API_URL_PREFIX } from "./services.module";
import { map } from "rxjs/internal/operators";
import { IPlaySong, ISongUrl } from "./dataTypes/common.types";

@Injectable({
  providedIn: ServicesModule,
})
export class SongService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL_PREFIX) private uri: string
  ) {}

  // 获取歌曲的url
  getSongUrl(id: number | string): Observable<ISongUrl[]> {
    const params = new HttpParams().set("id", id.toString());
    return this.http
      .get(this.uri + "song/url", { params })
      .pipe(map((res: { data: ISongUrl[] }) => res.data));
  }

  getSong(song: IPlaySong | IPlaySong[]): Observable<IPlaySong[]> {
    const songArr = Array.isArray(song) ? song.slice() : [song];
    const ids = songArr.map((song) => song.id).join(",");
    return new Observable((observer) => {
      this.getSongUrl(ids).subscribe((urls) => {
        observer.next(this.generatePlaySong(songArr, urls));
      });
    });
  }

  private generatePlaySong(songs: IPlaySong[], urls: ISongUrl[]): IPlaySong[] {
    const result = [];
    songs.map((song) => {
      const url = urls.find((url) => url.id === song.id).url;
      if (url) {
        result.push({ ...song, url });
      }
    });
    return result;
  }
}
