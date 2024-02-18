import xlsx, { IContent, IJsonSheet } from "json-as-xlsx";
import { Bank } from "src/store/apps/bank";

interface Column {
  label: string;
  value: string;
  format?: string;
}

type TranslatedFields = { [K in keyof Bank]?: string }

const translatedFields: TranslatedFields = {
  status: 'Estado',
} 

class FileExporter {
  formatData(data: Bank[]): IJsonSheet[] {
    const columns = this.createColumns(data);
    const content = this.createContent(data);

    const exportableData: IJsonSheet[] = [{
      sheet: 'Envíos',
      columns,
      content
    }]
    
    return exportableData;
  }

  private createColumns(data: Bank[]) {
    const columns: Column[] = []
  
    for(const key in data[0]) {
      const translatedKey = this.translateKeys(key as keyof Bank)
      columns.push({
        label: this.toUpperCaseFirstLetter(translatedKey),
        value: translatedKey,
      })
    }
    
    return columns
  }

  private createContent(data: Bank[]) {
    const content: IContent[] = []

    data.map((bank) => {
      let translated: any = {}
      for(const key in bank) {
        const translatedKey = this.translateKeys(key as keyof Bank)
        translated = {
          ...translated,
          [this.toUpperCaseFirstLetter(translatedKey)]: bank[key as keyof Bank]
        }
      }
      content.push(translated)
    })
    
    return content;
  }

  private toUpperCaseFirstLetter (str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private translateKeys (string: keyof Bank): any {
    return translatedFields[string] ? translatedFields[string] : string;
  }

  export(toExport: IJsonSheet[]) {
    xlsx(toExport, { fileName: 'Envíos' });
  }
}

export const fileExporter = new FileExporter()