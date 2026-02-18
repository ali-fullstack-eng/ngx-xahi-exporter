
export interface XahiConfig {
  data: any[];
  type: 'PDF' | 'EXCEL' | 'POS' | 'CSV';
  fileName?: string;
  title?: string;
  logo?: string;
  themeColor?: string;
  showFooter?: boolean;
  footerText?: string;
  wrapText?: boolean;
  repeatHeader?: boolean;
}


export interface XahiPOSConfig extends XahiConfig {
  qrCode?: string;       
  invoiceNo?: string;
  customerName?: string;
  customerPhone?: string;
  billDiscount?: number;
  receivedAmount?: number;
  companyAddress?: string;
  companyPhone?: string;
}