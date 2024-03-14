export default interface IUserPlot {
    fullyPaid: boolean,
    userId: string,
    plotId: string,
    price: number,
    monthlyPayment: number,
    estate: string,
    plotNo: number,
    installments: number | null,
    nextPaymentDue: Date | null,
    pendingPrice: number | null,
    id: string,
    downPayment: number
}