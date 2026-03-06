import { XahiConfig } from '../models/xahi-config';

export async function generatePOS(config: any, fileName: string) {
  const { default: jsPDF } = await import('jspdf');
  

  const doc = new jsPDF({ unit: 'mm', format: [80, 297] });
  let y = 10;
  const margin = 5;
  const pageWidth = 80;
  const rightEdge = pageWidth - margin;
  const qrBoxSize = 16;

  const drawLine = (yPos: number, thickness = 0.15) => {
    doc.setLineWidth(thickness);
    doc.setDrawColor(0); 
    doc.line(margin, yPos, rightEdge, yPos);
  };


  let textStartX = margin; 

  if (config.qrCode) {
 
    doc.addImage(config.qrCode, 'PNG', margin, y, qrBoxSize, qrBoxSize); 
    textStartX = margin + qrBoxSize + 3; 
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const availableTextWidth = pageWidth - textStartX - margin;
  const splitTitle = doc.splitTextToSize(config.title?.toUpperCase() || 'XAHI SOLUTIONS', availableTextWidth);
  doc.text(splitTitle, textStartX, y + 4); 
  
  let headerTextY = y + 4 + (splitTitle.length * 4);

 
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80); 

  if (config.companyAddress) {
    const splitAddr = doc.splitTextToSize(config.companyAddress, availableTextWidth);
    doc.text(splitAddr, textStartX, headerTextY);
    headerTextY += (splitAddr.length * 3.2);
  }

  if (config.companyPhone) {
    doc.text(`Tel: ${config.companyPhone}`, textStartX, headerTextY);
    headerTextY += 4;
  }
  

  y = Math.max(headerTextY, y + qrBoxSize + 2); 

  doc.setTextColor(0); 
  drawLine(y, 0.4); 
  y += 6;


  doc.setFontSize(7.2); 
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE #:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(config.invoiceNo || 'N/A', margin + 16, y);
  doc.setFont('helvetica', 'bold');
  doc.text('DATE:', 46, y);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleDateString(), 56, y);
  y += 4.5;

  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER:', margin, y);
  doc.setFont('helvetica', 'normal');
  const custName = config.customerName || 'Walk-in Customer';
  doc.text(custName.length > 20 ? custName.substring(0, 18) + '..' : custName, margin + 16, y);
  doc.setFont('helvetica', 'bold');
  doc.text('PHONE:', 46, y);
  doc.setFont('helvetica', 'normal');
  doc.text(config.customerPhone || 'N/A', 56, y); 

  y += 3;
  drawLine(y, 0.2);

 
  y += 5;
  doc.setFont('helvetica', 'bold').setFontSize(7.5);
  doc.text('ITEM', margin, y);
  doc.text('QTY', 36, y, { align: 'center' });
  doc.text('PRICE', 48, y, { align: 'center' });
  doc.text('DISC', 60, y, { align: 'center' });
  doc.text('TOTAL', rightEdge, y, { align: 'right' });
  y += 2.5;
  drawLine(y, 0.3);
  

  y += 5;
  doc.setFont('helvetica', 'normal');
  let subTotal = 0;
  config.data.forEach((item: any) => {
    const name = item.item_name || item.item || 'N/A';
    const total = item.total || 0;
    subTotal += Number(total);
    const splitName = doc.splitTextToSize(name.toString(), 30);
    doc.text(splitName, margin, y);
    doc.text((item.qty || 0).toString(), 36, y, { align: 'center' });
    doc.text((item.price || 0).toLocaleString(), 48, y, { align: 'center' });
    doc.text((item.discount || 0).toLocaleString(), 60, y, { align: 'center' });
    doc.text(total.toLocaleString(), rightEdge, y, { align: 'right' });
    y += (splitName.length * 3.8) + 1;
  });


  y += 3; drawLine(y, 0.2); y += 6;
  const bDisc = Number(config.billDiscount) || 0;
  const gTotal = subTotal - bDisc;
  doc.setFontSize(8);
  doc.text('Sub Total:', 58, y, { align: 'right' });
  doc.text(subTotal.toLocaleString(), rightEdge, y, { align: 'right' });
  if (bDisc > 0) {
    y += 4.5; doc.setFont('helvetica', 'bold');
    doc.text('Bill Discount:', 58, y, { align: 'right' });
    doc.text(`-${bDisc.toLocaleString()}`, rightEdge, y, { align: 'right' });
  }
  y += 7; doc.setFont('helvetica', 'bold').setFontSize(10.5);
  doc.text('GRAND TOTAL:', margin, y);
  doc.text(gTotal.toLocaleString(), rightEdge, y, { align: 'right' });

  y += 7; doc.setFont('helvetica', 'normal').setFontSize(8);
  doc.text('Received Amount:', 58, y, { align: 'right' });
  doc.text((Number(config.receivedAmount) || gTotal).toLocaleString(), rightEdge, y, { align: 'right' });
  y += 4.5; doc.text('Change to Return:', 58, y, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  const bal = (Number(config.receivedAmount) || gTotal) - gTotal;
  doc.text(Math.abs(bal).toLocaleString(), rightEdge, y, { align: 'right' });

 
  y += 12; drawLine(y, 0.2); y += 6;
  doc.setFontSize(7).setFont('helvetica', 'italic').setTextColor(100);
  doc.text(doc.splitTextToSize(config.footerText || 'Thank you!', 70), 40, y, { align: 'center' });
  y += 9;
doc.setFont('helvetica', 'bold').setFontSize(7.5).setTextColor(209, 72, 54); // Gmail Red color
  doc.textWithLink('Support: seewayshelp@gmail.com', 40, y, { 
    url: 'mailto:seewayshelp@gmail.com', 
    align: 'center' 
  });

  doc.save(`${fileName}_POS.pdf`);
}