import { NgModule } from "@angular/core";
import { WySliderComponent } from "./wy-slider.component";
import { WySliderTrackComponent } from "./wy-slider-track.component";
import { WySliderHandleComponent } from "./wy-slider-handle.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    WySliderComponent,
    WySliderTrackComponent,
    WySliderHandleComponent,
  ],
  imports: [CommonModule],
  exports: [WySliderComponent],
})
export class WySliderModule {}
