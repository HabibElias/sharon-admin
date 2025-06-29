export default interface Donation {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  donationType: string;
  amount: number;
  frequency: string;
  paymentMethod: string;
  receiptFilename: string;
  materials: any;
  message: string;
  date: string;
}