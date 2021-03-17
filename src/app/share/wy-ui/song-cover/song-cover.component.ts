import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { IPersonalized } from "../../../services/dataTypes/common.types";

@Component({
  selector: "app-song-cover",
  templateUrl: "./song-cover.component.html",
  styleUrls: ["./song-cover.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongCoverComponent implements OnInit {
  @Input("item") item: IPersonalized;

  @Output() onPlay = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  // 点击歌单封面的播放按钮
  clickPlayBtn(id: number) {
    this.onPlay.emit(id);
  }
}
