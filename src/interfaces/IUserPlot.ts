export default interface IUserPlot {
    fullyPaid: boolean,
    userId: string,
    plotId: string,
    price: number,
    estate: string,
    plotNo: number,
    size: string,
    pricePerSQM: string,    
    id?: string,
    installments: number | null,
    pendingPrice: number | null,
    nextPaymentDue: string | null,
    downPayment: number | null
    monthlyPayment: number | null,

}