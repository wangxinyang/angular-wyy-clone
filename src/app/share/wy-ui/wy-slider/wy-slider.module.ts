import { NgModule } from "@angular/core";
import { WySliderComponent } from "./wy-slider.component";
import { WySliderTrackComponent } from "./wy-slider-track.component";
import { WySliderHandleComponent } from "./wy-slider-handle.component";

@NgModule({
  declarations: [
    WySliderComponent,
    WySliderTrackComponent,
    WySliderHandleComponent,
  ],
  imports: [],
  exports: [WySliderComponent],
})
export class WySliderModule {}
