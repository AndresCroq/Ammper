import xlsx, { IContent, IJsonSheet } from "json-as-xlsx";
import { CoreData } from "src/store/apps/shipments";

interface Column {
  label: string;
  value: string;
  format?: string;
}

type TranslatedFields = { [K in keyof CoreData]: string }

const translatedFields: TranslatedFields = {
  id: 'Código de envío',
  buyer: 'Comprador',
  address: 'Destino',
  seller: 'Vendedor',
  sellerAddress: 'Origen',
  zipCode: 'Zip',
  deliveryPreferences: 'Tipo de envío',
  deliveryTime: 'Fecha estimada de envío',
  destinationLatitude: 'Latitud',
  destinationLongitude: 'Longitud',
  status: 'Estado',
  order: 'Código de venta',
} 

class FileExporter {
  formatData(data: CoreData[]): IJsonSheet[] {
    const columns = this.createColumns(data);
    const content = this.createContent(data);

    const exportableData: IJsonSheet[] = [{
      sheet: 'Envíos',
      columns,
      content
    }]
    
    return exportableData;
  }

  private createColumns(data: CoreData[]) {
    const columns: Column[] = []

    for(const key in data[0]) {
      if(key === 'originLatitude') continue
      if (key === 'originLongitude') continue
      if (key === 'deliveryType') continue
      const translatedKey = this.translateKeys(key as keyof CoreData)
      columns.push({
        label: this.toUpperCaseFirstLetter(translatedKey),
        value: translatedKey,
      })
    }
    
    return columns
  }

  private createContent(data: CoreData[]) {
    const content: IContent[] = []

    data.map((shipment) => {
      let translated: any = {}
      for(const key in shipment) {
        if(key === 'originLatitude') continue
        if (key === 'originLongitude') continue
        if (key === 'deliveryType') continue
        const translatedKey = this.translateKeys(key as keyof CoreData)
        translated = {
          ...translated,
          [this.toUpperCaseFirstLetter(translatedKey)]: shipment[key as keyof CoreData]
        }
      }
      content.push(translated)
    })
    
    return content;
  }

  private toUpperCaseFirstLetter (str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private translateKeys (string: keyof CoreData): any {
    return translatedFields[string] && translatedFields[string]
  }

  export(toExport: IJsonSheet[]) {
    xlsx(toExport, { fileName: 'Envíos' });
  }
}

export const fileExporter = new FileExporter()