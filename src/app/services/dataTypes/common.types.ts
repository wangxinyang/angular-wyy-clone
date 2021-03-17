export interface IBanner {
  targetId: number;
  url: string;
  imageUrl: string;
}

export interface IHotTag {
  id: number;
  name: string;
  position: number;
}

export interface IPersonalized {
  id: number;
  name: string;
  picUrl: number;
  playCount: number;
}

export interface ISinger {
  id: number;
  name: string;
  picUrl: number;
  albumSize: number;
}
