import { XahiConfig } from '../models/xahi-config';

export async function generateExcel(config: XahiConfig, fileName: string) {
  try {
    const ExcelJS = await import('exceljs');
    const WorkbookClass = (ExcelJS as any).Workbook || (ExcelJS as any).default?.Workbook;
    const workbook = new WorkbookClass();
    const worksheet = workbook.addWorksheet('Enterprise Report');

  
    worksheet.views = [{ showGridLines: false, state: 'frozen', ySplit: 1, activePane: 'bottomLeft' }];

    const keys = Object.keys(config.data[0]);
    const themeColor = (config.themeColor || '#1a5f7a').replace('#', '');
    const shouldEmbedImages = config.data.length <= 200;

   
    worksheet.columns = keys.map(k => {
      const isImg = k.toLowerCase() === 'img' || k.toLowerCase() === 'image';
      const maxContentLen = Math.max(
        k.length, 
        ...config.data.map(row => String(row[k] || '').length)
      );
      
      return { 
        header: k.toUpperCase().replace(/_/g, ' '), 
        key: k, 
       
        width: isImg ? 18 : Math.min(Math.max(maxContentLen + 2, 8), 40) 
      };
    });


    const headerRow = worksheet.getRow(1);
    headerRow.height = 32; 
    headerRow.eachCell((cell:any) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: themeColor } };
      cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 9, name: 'Segoe UI' };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
     
      cell.border = { bottom: { style: 'medium', color: { argb: '000000' } } };
    });

    
    for (let i = 0; i < config.data.length; i++) {
      const rowData = config.data[i];
      const row = worksheet.addRow(rowData);
      
      row.height = shouldEmbedImages && (rowData.img || rowData.image) ? 65 : 18;

      row.eachCell((cell:any) => {
        
        if (i % 2 !== 0) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F9FAFB' } };
        }
        
       
        cell.border = {
          bottom: { style: 'thin', color: { argb: 'E5E7EB' } },
          right: { style: 'thin', color: { argb: 'F3F4F6' } }
        };
        
        cell.font = { size: 9, name: 'Segoe UI', color: { argb: '374151' } }; 
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: false };
      });

      const imgKey = rowData.img ? 'img' : (rowData.image ? 'image' : null);
      const imgValue = imgKey ? rowData[imgKey] : null;

      if (shouldEmbedImages && imgValue && imgValue.startsWith('http')) {
        try {
          const response = await fetch(imgValue);
          const buffer = await response.arrayBuffer();
          const imageId = workbook.addImage({ buffer, extension: 'jpeg' });

          const colIndex = keys.indexOf(imgKey!);
          worksheet.addImage(imageId, {
            tl: { col: colIndex, row: i + 1 },
            ext: { width: 80, height: 80 },
            editAs: 'oneCell'
          });
          row.getCell(colIndex + 1).value = ""; 
        } catch (e) {
          console.warn("Skipping bad image");
        }
      }
    }

   
    worksheet.autoFilter = { from: { row: 1, col: 1 }, to: { row: 1, col: keys.length } };

    const buffer = await workbook.xlsx.writeBuffer();
    saveFile(buffer, fileName);

  } catch (error) {
    console.error("MNC Excel Handler Error:", error);
  }
}

function saveFile(buffer: any, fileName: string) {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}