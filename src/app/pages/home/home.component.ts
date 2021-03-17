import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NzCarouselComponent } from "ng-zorro-antd";
import { map } from "rxjs/internal/operators";
import {
  IBanner,
  IHotTag,
  IPersonalized,
  ISinger,
} from "../../services/dataTypes/common.types";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
})
export class HomeComponent implements OnInit {
  // banner的下方小圆点的index
  nextActiveIndex = 0;

  // 存储轮播图
  banners: IBanner[];
  // 存储热门标签
  tags: IHotTag[];
  // 存储推荐歌单
  personalizeds: IPersonalized[];
  // 歌手数据
  singerInfos: ISinger[];

  // 获取banner的dom
  @ViewChild("carousel", { static: true })
  private carousel: NzCarouselComponent;

  constructor(private route: ActivatedRoute) {
    this.route.data
      .pipe(map((res) => res.homeData))
      .subscribe(([banners, tags, personalizeds, singerInfos]) => {
        this.banners = banners;
        this.tags = tags;
        this.personalizeds = personalizeds;
        this.singerInfos = singerInfos;
      });
    // // 获取轮播图的数据 获取数据的逻辑已经都移动到了resolver守卫中
    // this.getBanners();
    // // 获取热门歌单标签
    // this.getHotTags();
    // // 获取热门歌单
    // this.getPersonalized();
    // // 获取歌手信息
    // this.getSingerInfos();
  }
  ngOnInit(): void {}

  // 处理banner的切换面板的回调
  handleBeforeChange({ to }) {
    this.nextActiveIndex = to;
  }

  // 处理左右箭头的事件
  handleSlider(type) {
    this.carousel[type]();
  }
}
