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
  selector: "app-wy-slider-handle",
  template: `<div class="wy-slider-handle" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WySliderHandleComponent implements OnInit, OnChanges {
  @Input() verticalType = false;
  @Input() offset: number;

  style: IWySliderType = {};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("handle offset", this.offset);

    if (changes["offset"]) {
      this.style[this.verticalType ? "bottom" : "left"] = this.offset + "%";
    }
  }
}
