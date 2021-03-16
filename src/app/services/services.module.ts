import { InjectionToken, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// 定义常量
export const API_URL_PREFIX = new InjectionToken("ApiUrlPrefix");

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: API_URL_PREFIX, useValue: "http://localhost:3000/" }],
})
export class ServicesModule {}
