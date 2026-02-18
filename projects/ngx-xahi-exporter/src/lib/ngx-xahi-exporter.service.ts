import { Injectable } from '@angular/core';
import { XahiConfig, XahiPOSConfig } from './models/xahi-config';
import { generatePDF } from './handlers/pdf-handler';
import { generateExcel } from './handlers/excel-handler';
import { generateCSV } from './handlers/csv-handler';
import { generatePOS } from './handlers/pos-handler';

@Injectable({
  providedIn: 'root'
})
export class XahiExporterService{

  constructor() {
    console.log("%c Xahi Smart Exporter 🚀 ", "color: white; background: #1a73e8; font-weight: bold; padding: 2px 5px; border-radius: 3px;");
  }

  public async export(config: XahiConfig) {
    if (!config.data || config.data.length === 0) return;

    const fileName = config.fileName || `Export_${new Date().getTime()}`;

    switch (config.type) {
      case 'PDF':
        await generatePDF(config, fileName);
        break;
      case 'EXCEL':
        await generateExcel(config, fileName);
        break;
      case 'CSV':
        await generateCSV(config, fileName);
        break;
      case 'POS':
        await generatePOS(config as XahiPOSConfig, fileName);
        break;
    }
  }
}