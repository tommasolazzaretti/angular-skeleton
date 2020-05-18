import * as objectMapper from 'object-mapper';

export class Mapper {

  public static map<T>(fromObject: any, toObject: any, propertyMap?: any) {
    return objectMapper(fromObject, toObject, propertyMap) as T;
  }

  public static getKeyValue(fromObject: any, fromKey: any) {
    return objectMapper.getKeyValue(fromObject, fromKey);
  }

  public static testMapp(fromObject: any, fromKeys: any, ignoreList: string[]) {
    const rt = [];

    if (ignoreList === undefined || ignoreList === null || ignoreList.length === 0) {
      fromKeys.forEach(element => {
        if (Mapper.getKeyValue(fromObject, element) === undefined) {
          rt.push('error');
        }
      });
    } else {
      ignoreList.forEach(x => {
        return fromKeys.forEach(element => {
          if (element === x) {
            return;
          } else if (Mapper.getKeyValue(fromObject, element) === undefined) {
            rt.push('error');
          }
        });
      });
    }
    return rt;
  }
}
