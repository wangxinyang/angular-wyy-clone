import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { IWySliderType } from "./wy-slider-types";

@Component({
  selector: "app-wy-slider-handle",
  template: `<div class="wy-slider-handle"></div>`,
})
export class WySliderHandleComponent implements OnInit, OnChanges {
  @Input() verticalType = false;
  @Input() offset: number;

  style: IWySliderType = {};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["offset"]) {
      this.style[this.verticalType ? "bottom" : "left"] = this.offset + "%";
    }
  }
}
