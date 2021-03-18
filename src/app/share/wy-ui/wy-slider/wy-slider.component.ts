import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { fromEvent, merge, Observable } from "rxjs";
import {
  distinctUntilChanged,
  map,
  pluck,
  takeUntil,
  tap,
} from "rxjs/internal/operators";
import { IWySliderObservableConfig } from "./wy-slider-types";
import { inArray, limitNumberInRange } from "../../../utils/array";
import { getElementOffset } from "./wy-slider-helper";

@Component({
  selector: "app-wy-slider",
  templateUrl: "./wy-slider.component.html",
  styleUrls: ["./wy-slider.component.less"],
  encapsulation: ViewEncapsulation.None, //能过让css传递下去
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WySliderComponent implements OnInit {
  @ViewChild("wySlider", { static: true }) private slider: ElementRef;
  @Input() verticalType = false;
  @Input() minPosition = 0;
  @Input() maxPosition = 100;

  private sliderDOM: HTMLDivElement;

  private start$: Observable<number>;
  private move$: Observable<number>;
  private end$: Observable<Event>;
  private isMove = false;
  private position: number | null = null;
  offset: number | null = null;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sliderDOM = this.slider.nativeElement;
    this.createSliderObservable();
    this.subscribeEvent(["start"]);
  }

  private createSliderObservable() {
    const orientField = this.verticalType ? "pageY" : "pageX";
    const mouse: IWySliderObservableConfig = {
      start: "mousedown",
      move: "mousemove",
      end: "mouseup",
      pluckKey: orientField,
    };
    const touch: IWySliderObservableConfig = {
      start: "touchstart",
      move: "touchmove",
      end: "touchend",
      pluckKey: "touches[0]." + orientField,
    };

    [mouse, touch].map((source) => {
      const { start, move, end, pluckKey } = source;
      source.startObserver$ = fromEvent(this.sliderDOM, start).pipe(
        tap((e) => {
          // 阻止冒泡
          e.stopPropagation();
          // 阻止默认动作
          e.preventDefault();
        }),
        pluck(pluckKey),
        map((position: number) => this.converterByPosition(position))
      );
      source.endObserver$ = fromEvent(this.doc, end);
      source.moveObserver$ = fromEvent(this.doc, move).pipe(
        tap((e) => {
          // 阻止冒泡
          e.stopPropagation();
          // 阻止默认动作
          e.preventDefault();
        }),
        pluck(pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.converterByPosition(position)),
        takeUntil(source.endObserver$)
      );
    });
    this.start$ = merge(mouse.startObserver$, touch.startObserver$);
    this.move$ = merge(mouse.moveObserver$, touch.moveObserver$);
    this.end$ = merge(mouse.endObserver$, touch.endObserver$);
  }

  private subscribeEvent(event: string[] = ["start", "move", "end"]) {
    if (inArray("start", event) && this.start$) {
      this.start$.subscribe(this.onStartEvt.bind(this));
    }
    if (inArray("move", event) && this.move$) {
      this.move$.subscribe(this.onMoveEvt.bind(this));
    }
    if (inArray("end", event) && this.end$) {
      this.end$.subscribe(this.onEndEvt.bind(this));
    }
  }

  // 滑块开始移动的事件
  private onStartEvt(position: number) {
    this.toggleMove(true);
    this.setValue(position);
  }

  private toggleMove(isMove: boolean) {
    this.isMove = isMove;
    if (isMove) {
      this.subscribeEvent(["move", "end"]);
    } else {
    }
  }

  // 滑块移动的事件
  private onMoveEvt(position: number) {
    if (this.isMove) {
      this.setValue(position);
      this.cdr.markForCheck(); //手动进行变更检测
    }
  }

  private setValue(position: number) {
    if (this.position !== position) {
      this.position = position;
      this.updateTrackAndHandles();
    }
  }

  // 更新滑块的位置
  private updateTrackAndHandles() {
    this.offset = this.converterPositionToOffset();
    this.cdr.markForCheck();
  }

  private converterPositionToOffset() {
    return (
      ((this.position - this.minPosition) /
        (this.maxPosition - this.minPosition)) *
      100
    );
  }

  // 滑块停止移动的事件
  private onEndEvt() {
    this.toggleMove(false);
    this.cdr.markForCheck(); //手动进行变更检测
  }

  private converterByPosition(position: number): number {
    const sliderLength = this.getSliderLength();
    const sliderStart = this.getSliderStartPosition();
    const ratio = limitNumberInRange(
      (position - sliderStart) / sliderLength,
      0,
      1
    );
    //  竖状的滚动条的比例是倒过来的
    const realRatio = this.verticalType ? 1 - ratio : ratio;
    return realRatio * (this.maxPosition - this.minPosition) + this.minPosition;
  }

  // 获取滑块的长度
  private getSliderLength(): number {
    return this.verticalType
      ? this.sliderDOM.clientHeight
      : this.sliderDOM.clientWidth;
  }

  // 获取滑块起始的位置
  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDOM);
    return this.verticalType ? offset.top : offset.left;
  }
}
