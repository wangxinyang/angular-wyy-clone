import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { IWySliderType } from "./wy-slider-types";

@Component({
  selector: "app-wy-slider-track",
  template: `<div class="wy-slider-track" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WySliderTrackComponent implements OnInit, OnChanges {
  @Input() verticalType = false;
  @Input() offset: number;

  style: IWySliderType = {};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("track offset", this.offset);
    if (changes["offset"]) {
      if (this.verticalType) {
        this.style.height = this.offset + "%";
      } else {
        this.style.width = this.offset + "%";
      }
    }
  }
}
