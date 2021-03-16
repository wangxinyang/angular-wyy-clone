import { Component, OnInit, ViewChild } from "@angular/core";
import { NzCarouselComponent } from "ng-zorro-antd";
import { HomeService } from "src/app/services/home.service";
import { Banner } from "../../services/dataTypes/common.types";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
})
export class HomeComponent implements OnInit {
  // banner的下方小圆点的index
  nextActiveIndex = 0;

  // 存储轮播图
  banners: Banner[];

  // 获取banner的dom
  @ViewChild("carousel", { static: true })
  private carousel: NzCarouselComponent;

  constructor(private homeSevice: HomeService) {
    this.homeSevice.getBanners().subscribe((banners) => {
      this.banners = banners;
    });
  }

  ngOnInit() {}

  // 处理banner的切换面板的回调
  handleBeforeChange({ to }) {
    this.nextActiveIndex = to;
  }

  // 处理左右箭头的事件
  handleSlider(type) {
    this.carousel[type]();
  }
}
