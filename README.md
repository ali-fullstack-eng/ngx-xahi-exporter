# Xahi Smart Exporter 🚀

A high-performance, lightweight, and professional Angular library to export JSON data into **PDF**, **Excel**, **CSV**, and **POS Receipts** with zero configuration and MNC-standard styling.

---

## ✨ Features
- ✅ **Dynamic Imports:** Heavy libraries (jsPDF, ExcelJS) only load when needed.
- ✅ **Professional Excel:** Includes Zebra stripes, dynamic column widths, and image support.
- ✅ **MNC Standard PDF:** Clean layouts with auto-calculated table widths.
- ✅ **POS Receipt Mode:** Specifically designed for 80mm thermal printers with QR code support.
- ✅ **Smart Images:** Automatically handles base64 and URL images in exports.

---

## 📦 Installation

Install the library via NPM:

```bash
npm install ngx-xahi-exporter
🚀 How to Use
1. Inject the Service
Inject the XahiExporterService in your component constructor.
code
TypeScript
import { XahiExporterService } from 'ngx-xahi-exporter';

constructor(private exporter: XahiExporterService) {}
2. Standard Reports (PDF, EXCEL, CSV)
Use this for professional business reports.
code
TypeScript
exportReport() {
  const config = {
    type: 'PDF', // Can be 'PDF' | 'EXCEL' | 'CSV'
    fileName: 'Monthly_Sales_Report',
    title: 'XAHI ENTERPRISE REPORT',
    themeColor: '#1a5f7a', // Brand Color
    logo: 'https://your-domain.com/logo.png', // Optional
    data: [
      { ID: 1, Product: 'Laptop', Price: 150000, Status: 'Delivered' },
      { ID: 2, Product: 'Mouse', Price: 1200, Status: 'Pending' },
      { ID: 3, Product: 'Keyboard', Price: 4500, Status: 'Delivered' }
    ],
    footerText: '© 2024 Xahi Solutions | Confidential Report',
    repeatHeader: true
  };

  this.exporter.export(config);
}
3. POS Receipt (Special 80mm Design)
Perfect for retail shops, restaurants, and thermal printers.
code
TypeScript
exportInvoice() {
  const posConfig = {
    type: 'POS',
    fileName: 'Invoice_786',
    title: 'XAHI SMART RETAIL',
    companyAddress: 'Main Business Ave, Phase 6, Karachi',
    companyPhone: '+92 321 1234567',
    invoiceNo: 'INV-2024-001',
    customerName: 'Muhammad Ali',
    customerPhone: '0300-1112223',
    qrCode: 'data:image/png;base64,iVBORw0KGgo...', // Base64 String
    billDiscount: 100,
    receivedAmount: 5000,
    data: [
      { item: 'Burger', qty: 2, price: 500, discount: 0, total: 1000 },
      { item: 'Fries Large', qty: 1, price: 350, discount: 0, total: 350 },
      { item: 'Soft Drink', qty: 3, price: 150, discount: 0, total: 450 }
    ],
    footerText: 'Thank you for your visit!'
  };

  this.exporter.export(posConfig);
}
⚙️ Configuration Options (XahiConfig)
Property	Type	Description
type	string	Export format: 'PDF', 'EXCEL', 'CSV', or 'POS'.
data	any[]	Array of JSON objects to be exported.
fileName	string	Name of the downloaded file (without extension).
title	string	Main header title inside the document.
themeColor	string	Hex code for header styling (default: #1a5f7a).
logo	string	URL or Base64 string for the company logo.
qrCode	string	(POS Only) Base64 image string for QR code.
footerText	string	Text to display at the bottom of the page/receipt.
🛡️ License
MIT - Developed by Xahi
