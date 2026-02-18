import { XahiConfig } from '../models/xahi-config';

export async function generatePDF(config: XahiConfig, fileName: string) {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const keys = Object.keys(config.data[0]);
  const primaryColor = config.themeColor || '#1a5f7a';
  const wrap = config.wrapText ?? false;

 
  const colWidths: any = {};
  keys.forEach(key => {
    const maxChar = Math.max(key.length, ...config.data.map(row => String(row[key] || '').length));
    colWidths[key] = (key === 'img' || key === 'image') ? 30 : Math.max(maxChar * 3.2, 25);
  });

  const totalPageWidth = Object.values(colWidths).reduce((a: any, b: any) => a + b, 0) as number + 30;
  
 
  const doc = new jsPDF('l', 'mm', [totalPageWidth, 210]);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

 
  const drawHeader = (doc: any) => {
    doc.setFillColor('#fcfcfc'); 
    doc.rect(0, 0, pageWidth, 35, 'F');

    if (config.logo) {
      doc.addImage(config.logo, 'PNG', 15, 7, 20, 20);
    }

    const titleX = config.logo ? 40 : 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(primaryColor);
    doc.text(config.title?.toUpperCase() || 'OFFICIAL SYSTEM REPORT', titleX, 18);

    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(`INTERNATIONAL OPERATIONS | DATA VERIFIED`, titleX, 24);
    
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(15, 32, pageWidth - 15, 32);
  };

  
  const headers = keys.map(k => k.toUpperCase().replace('_', ' '));
  const body = config.data.map(row => keys.map(k => (k === 'img' || k === 'image' ? '' : row[k])));

  await autoTable(doc, {
    startY: 40,
    head: [headers],
    body: body,
    theme: 'grid',
    margin: { left: 15, right: 15, bottom: 25 }, 
    rowPageBreak: 'avoid', 
    headStyles: { 
      fillColor: primaryColor, 
      halign: 'center', 
      valign: 'middle',
      fontSize: 9, 
      minCellHeight: 12
    },
    bodyStyles: {
      minCellHeight: config.data.some(r => r.img || r.image) ? 26 : 10,
      valign: 'middle',
      fontSize: 8.5,
      halign: 'center'
    },
    columnStyles: keys.reduce((acc: any, key, index) => {
      acc[index] = { cellWidth: colWidths[key] };
      return acc;
    }, {}),
    
    didDrawPage: (data) => {
      if (config.repeatHeader || data.pageNumber === 1) {
        drawHeader(doc);
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(160);

      doc.setDrawColor(220);
      doc.setLineWidth(0.2);
      doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);

      const footerY = pageHeight - 10;
      
      const fText = config.footerText || `© ${new Date().getFullYear()} ${config.title} | Confidential Business Document`;
      doc.text(fText, 15, footerY);
      
      doc.text(`PAGE ${data.pageNumber} OF ${doc.getNumberOfPages()}`,  pageWidth - 15, footerY, { align: 'right' });
      
   
    },

    didDrawCell: (data) => {
      const key = keys[data.column.index];
      if ((key === 'img' || key === 'image') && data.section === 'body') {
        const imgUrl = config.data[data.row.index][key];
        if (imgUrl && typeof imgUrl === 'string') {
          try {
            const size = Math.min(data.cell.width, data.cell.height) - 6;
            const x = data.cell.x + (data.cell.width - size) / 2;
            const y = data.cell.y + (data.cell.height - size) / 2;
            doc.addImage(imgUrl, 'JPEG', x, y, size, size);
          } catch (e) { /* silent fail for bad images */ }
        }
      }
    }
  });

  doc.save(`${fileName}.pdf`);
}