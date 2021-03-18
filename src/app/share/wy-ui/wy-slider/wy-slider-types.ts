import { Observable } from "rxjs";

export interface IWySliderType {
  width?: string | null;
  height?: string | null;
  left?: string | null;
  bottom?: string | null;
}

export interface IWySliderObservableConfig {
  start: string;
  move: string;
  end: string;
  pluckKey: string;
  startObserver$?: Observable<number>;
  moveObserver$?: Observable<number>;
  endObserver$?: Observable<Event>;
}
