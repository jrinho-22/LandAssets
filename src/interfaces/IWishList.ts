import IPlot from "./IPlot";

export default interface IWishList extends Omit<IPlot, 'number'> {
  plot: IPlot;
  plotNumber: string;
  dayAdded: string;
  status: string;
}
