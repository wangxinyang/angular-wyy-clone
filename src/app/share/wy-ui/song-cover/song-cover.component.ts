import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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

  constructor() {}

  ngOnInit() {}
}
