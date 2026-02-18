import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XahiExporterService } from 'ngx-xahi-exporter';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
testData = [
  {
    id: 1,
    
    item: 'Gaming Mouse',
    sku: 'MS-001',
    category: 'Electronics',
    brand: 'Logitech',
    qty: 50,
    price: 1200,
    discount: '10%',
    tax: '5%',
    total: 54000,
    supplier: 'Tech world',
    warehouse: 'Karachi A1',
    status: 'In Stock',
    warranty: '1 Year',
    weight: '200g',
    color: 'Black',
    location: 'Shelf 5',
    bin: 'B-12',
    last_updated: '2024-02-15',
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05v9ZR-Zv0iztDQEACjBN9JQ4ftI9uNL6Og&s'
  },
    {
    id: 1,
    
    item: 'Gaming Mouse',
    sku: 'MS-001',
    category: 'Electronics',
    brand: 'Logitech',
    qty: 50,
    price: 1200,
    discount: '10%',
    tax: '5%',
    total: 54000,
    supplier: 'Tech world',
    warehouse: 'Karachi A1',
    status: 'In Stock',
    warranty: '1 Year',
    weight: '200g',
    color: 'Black',
    location: 'Shelf 5',
    bin: 'B-12',
    last_updated: '2024-02-15',
     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rzl1SmVeky4JIg18v0twyy2Xc9oPL8O5QQ&s'
  },
    {
    id: 1,
    
    item: 'Gaming Mouse',
    sku: 'MS-001',
    category: 'Electronics',
    brand: 'Logitech',
    qty: 50,
    price: 1200,
    discount: '10%',
    tax: '5%',
    total: 54000,
    supplier: 'Tech world',
    warehouse: 'Karachi A1',
    status: 'In Stock',
    warranty: '1 Year',
    weight: '200g',
    color: 'Black',
    location: 'Shelf 5',
    bin: 'B-12',
    last_updated: '2024-02-15',
     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05v9ZR-Zv0iztDQEACjBN9JQ4ftI9uNL6Og&s'
  },
    {
    id: 1,
    
    item: 'Gaming Mouse',
    sku: 'MS-001',
    category: 'Electronics',
    brand: 'Logitech',
    qty: 50,
    price: 1200,
    discount: '10%',
    tax: '5%',
    total: 54000,
    supplier: 'Tech world',
    warehouse: 'Karachi A1',
    status: 'In Stock',
    warranty: '1 Year',
    weight: '200g',
    color: 'Black',
    location: 'Shelf 5',
    bin: 'B-12',
    last_updated: '2024-02-15',
     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rzl1SmVeky4JIg18v0twyy2Xc9oPL8O5QQ&s'
  },
    {
    id: 1,
    
    item: 'Gaming Mouse',
    sku: 'MS-001',
    category: 'Electronics',
    brand: 'Logitech',
    qty: 50,
    price: 1200,
    discount: '10%',
    tax: '5%',
    total: 54000,
    supplier: 'Tech world',
    warehouse: 'Karachi A1',
    status: 'In Stock',
    warranty: '1 Year',
    weight: '200g',
    color: 'Black',
    location: 'Shelf 5',
    bin: 'B-12',
    last_updated: '2024-02-15',
     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05v9ZR-Zv0iztDQEACjBN9JQ4ftI9uNL6Og&s'
  },
  ];

  constructor(private exporter: XahiExporterService) {}
myLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWBuB632p-BzikvlVaPUTEubUuieUuoFM2TQ&s';
download(type: 'PDF' | 'EXCEL' | 'POS' | 'CSV') {
  this.exporter.export({
    data: this.testData,
    fileName: 'Xahi_Master_Enterprise_Report',
    type: type,
    
    title: 'XAHI SOLUTIONS - GLOBAL OPERATIONS REPORT',
    logo: this.myLogo, 
    themeColor: '#709688', 
    repeatHeader: true,    
    wrapText: false,       
    showFooter: true,      
    footerText: 'This document is a private property of Xahi Solutions. Any unauthorized reproduction is strictly prohibited.', // User ka custom legal text
    
  });
}




downloadPOS() {
  const premiumData = [
    { item_name: 'MacBook Pro M3"', qty: 1, price: 3499.00, discount: 200.00, total: 3299.00 },
    { item_name: 'Apple Pro Display ', qty: 1, price: 4999.00, discount: 0, total: 4999.00 },
    { item_name: 'Magic Keyboard ', qty: 2, price: 199.00, discount: 20.00, total: 378.00 },
    { item_name: 'Studio Mouse ', qty: 2, price: 99.00, discount: 10.00, total: 188.00 }
  ];

 
  this.exporter.export({
    type: 'POS',
    fileName: `Invoice_XH_${new Date().getTime()}`,
    data: premiumData,
    title: 'XAHI GLOBAL SOLUTIONS - FLAGSHIP STORE',
    qrCode: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1iOkO51HlKeecz9lqySJ8Ju_pokx2jrcwIw&s', 
    companyAddress: 'Unit 102, Level 1, Gate Village 5, DIFC, UAE',
    companyPhone: '+971 4 362 2222',
    invoiceNo: 'XH-2026-0842', 
    customerName: 'Mr. Alexander ',
    customerPhone: '7700 900077',
    billDiscount: 150.00,     
    receivedAmount: 10000.00, 
    footerText: 'Terms & Conditions Apply. VAT Registered: 10045678900003. Goods once sold are returnable within 14 days in original packaging. Thank you for choosing Xahi Solutions Global.',
  } as any);
}
}
