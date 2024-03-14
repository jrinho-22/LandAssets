export default interface ICarousel {
  length: number;
  direction?: "row" | "column";
  actionTrigger?: boolean;
  backButton?: React.ReactNode;
  forwardButton?: React.ReactNode;
  children?: React.ReactNode;
  itemsUtils?: {
    items: Array<any>;
    activeValue: any;   
    setActiveValue: (v: any) => void;
  };
}
