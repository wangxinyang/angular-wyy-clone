import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { SongCoverComponent } from "./wy-ui/song-cover/song-cover.component";
import { PlayCountPipe } from "./pipes/play-count.pipe";

@NgModule({
  declarations: [SongCoverComponent, PlayCountPipe],
  imports: [CommonModule, NgZorroAntdModule, FormsModule],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    SongCoverComponent,
    PlayCountPipe,
  ],
})
export class ShareModule {}
