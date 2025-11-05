declare module "@paystack/inline-js" {
  // Minimal typing for the package used in this project.
  interface PaystackInlineOptions {
    key: string;
    amount: number;
    email: string;
    onSuccess?: (res: unknown) => void;
    onCancel?: () => void;
    [key: string]: unknown;
  }

  class PaystackPop {
    constructor(options?: Record<string, unknown>);
    newTransaction(options: PaystackInlineOptions): void;
  }

  export default PaystackPop;
}
