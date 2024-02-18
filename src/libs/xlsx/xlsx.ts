import xlsx, { IContent, IJsonSheet } from "json-as-xlsx";
import { Bank } from "src/store/apps/bank";

interface Column {
  label: string;
  value: string;
  format?: string;
}

class FileExporter {
  formatData(data: Bank[]): IJsonSheet[] {
    const columns = this.createColumns(data);
    const content = this.createContent(data);

    const exportableData: IJsonSheet[] = [{
      sheet: 'Account Data',
      columns,
      content
    }]
    
    return exportableData;
  }

  private createColumns(data: Bank[]) {
    const columns: Column[] = []
  
    for(const key in data[0]) {
      if(key === '_id' || key === 'id') continue
      columns.push({
        label: this.toUpperCaseFirstLetter(key),
        value: key,
      })
    }
    
    return columns
  }

  private createContent(data: Bank[]) {
    const content: IContent[] = []

    data.map((bank) => {
      let translated: any = {}
      for(const key in bank) {
        if(key === '_id' || key === 'id') continue
        translated = {
          ...translated,
          [key]: bank[key as keyof Bank]
        }
      }
      content.push(translated)
    })
    
    return content;
  }

  private toUpperCaseFirstLetter (str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  export(toExport: IJsonSheet[]) {
    xlsx(toExport, { fileName: 'Envíos' });
  }
}

export const fileExporter = new FileExporter()