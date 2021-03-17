import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeDetailResolverService } from "./home-detail-resolver.service";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "home", //这里的path不能加斜杠
    component: HomeComponent,
    data: { title: "发现" },
    resolve: { homeData: HomeDetailResolverService }, // 路由处也需要添加resolve的参数
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [HomeDetailResolverService], // home组件使用的resolver守卫 预先加载数据
})
export class HomeRoutingModule {}
