import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ShareModule } from "src/app/share/share.module";
import { WyCarsouselComponent } from './components/wy-carsousel/wy-carsousel.component';
import { MemberCardComponent } from './components/member-card/member-card.component';

@NgModule({
  declarations: [HomeComponent, WyCarsouselComponent, MemberCardComponent],
  imports: [ShareModule, HomeRoutingModule],
})
export class HomeModule {}
