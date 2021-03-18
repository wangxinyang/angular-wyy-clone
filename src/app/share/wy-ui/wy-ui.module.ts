import { NgModule } from "@angular/core";
import { SongCoverComponent } from "./song-cover/song-cover.component";
import { PlayCountPipe } from "../pipes/play-count.pipe";
import { WyPlayerModule } from "./wy-player/wy-player.module";
import { WySliderComponent } from "./wy-slider/wy-slider.component";

@NgModule({
  declarations: [SongCoverComponent, PlayCountPipe],
  imports: [WyPlayerModule],
  exports: [SongCoverComponent, WyPlayerModule],
})
export class WyUiModule {}
