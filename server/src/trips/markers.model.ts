export interface MarkersModel {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  label: {
    color: string;
    text: string;
    id: string;
  };
  options: {
    [key: string]: boolean | string
  };
}
