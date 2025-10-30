declare module "@paystack/inline-js" {
  // Minimal typing for the package used in this project.
  interface PaystackInlineOptions {
    key: string;
    amount: number;
    email: string;
    onSuccess?: (res: any) => void;
    onCancel?: () => void;
    [key: string]: any;
  }

  class PaystackPop {
    constructor(options?: any);
    newTransaction(options: PaystackInlineOptions): void;
  }

  export default PaystackPop;
}
