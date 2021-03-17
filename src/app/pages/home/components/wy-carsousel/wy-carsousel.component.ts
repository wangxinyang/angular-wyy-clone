import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-wy-carsousel",
  templateUrl: "./wy-carsousel.component.html",
  styleUrls: ["./wy-carsousel.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush, //简单组件修改变更检测的策略，onpush只在input变化之后才重新渲染提升性能
})
export class WyCarsouselComponent implements OnInit {
  // 父传子的入参
  @Input() activeIndex = 0;

  // 子传父
  @Output() changeSlider = new EventEmitter<"pre" | "next">();

  // static:true 不是经常变动的元素设置为静态 动态元素设置为false
  @ViewChild("dot", { static: true })
  dotRef: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}

  handleScroll(type: "pre" | "next") {
    // 子组件向父组件发射出去参数
    this.changeSlider.emit(type);
  }
}
