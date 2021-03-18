import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-wy-slider",
  templateUrl: "./wy-slider.component.html",
  styleUrls: ["./wy-slider.component.less"],
  encapsulation: ViewEncapsulation.None, //能过让css传递下去
})
export class WySliderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
