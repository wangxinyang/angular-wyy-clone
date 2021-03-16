import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ShareModule } from "src/app/share/share.module";
import { WyCarsouselComponent } from './components/wy-carsousel/wy-carsousel.component';

@NgModule({
  declarations: [HomeComponent, WyCarsouselComponent],
  imports: [ShareModule, HomeRoutingModule],
})
export class HomeModule {}
