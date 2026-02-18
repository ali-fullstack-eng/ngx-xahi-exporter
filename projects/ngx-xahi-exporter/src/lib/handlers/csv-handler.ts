import { XahiConfig } from '../models/xahi-config';

export async function generateCSV(config: XahiConfig, fileName: string) {
  try {
    const ExcelJS = await import('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Enterprise Report');

    const keys = Object.keys(config.data[0]);
    const themeColor = (config.themeColor || '#1a5f7a').replace('#', '');
    
   
    const imageThreshold = 200;
    const shouldEmbedImages = config.data.length <= imageThreshold;

    
    worksheet.columns = keys.map(k => {
      const isImage = k.toLowerCase() === 'img' || k.toLowerCase() === 'image';
      
      
      const maxLen = Math.max(
        k.length, 
        ...config.data.map(row => String(row[k] || '').length)
      );

      return { 
        header: k.toUpperCase().replace(/_/g, ' '), 
        key: k, 
       
        width: isImage ? 20 : Math.min(Math.max(maxLen + 2, 12), 50) 
      };
    });

  
    const headerRow = worksheet.getRow(1);
    headerRow.height = 25; 
    headerRow.eachCell((cell) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: themeColor } };
      cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = { bottom: { style: 'thin', color: { argb: '000000' } } };
    });

  
    for (let i = 0; i < config.data.length; i++) {
      const rowData = config.data[i];
      const row = worksheet.addRow(rowData);
      
    
      row.height = shouldEmbedImages && (rowData.img || rowData.image) ? 75 : 20;
      
      
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { size: 10 };
      });

   
      const imgKey = rowData.img ? 'img' : (rowData.image ? 'image' : null);
      const imgField = imgKey ? rowData[imgKey] : null;

      if (shouldEmbedImages && imgField && imgField.startsWith('http')) {
        try {
          const response = await fetch(imgField);
          const buffer = await response.arrayBuffer();
          
          const imageId = workbook.addImage({
            buffer: buffer,
            extension: 'jpeg',
          });

          const colIndex = keys.indexOf(imgKey!);
          
          
          worksheet.addImage(imageId, {
            tl: { col: colIndex, row: i + 1 }, 
            ext: { width: 95, height: 95 },    
            editAs: 'oneCell'
          });

        
          row.getCell(colIndex + 1).value = ""; 
        } catch (e) {
          console.warn("Skip image due to load error");
        }
      }
    }

    
    worksheet.views = [{ state: 'frozen', ySplit: 1 }]; 
    worksheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: keys.length } };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAsExcel(buffer, fileName);

  } catch (error) {
    console.error("Master Excel Handler Error:", error);
  }
}


function saveAsExcel(buffer: any, fileName: string) {
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