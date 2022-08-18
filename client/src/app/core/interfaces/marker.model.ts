export interface MarkerModel {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  label: {
    color: string;
    text: string;
  };
  options: {
    [key: string]: boolean | string
  }
}
