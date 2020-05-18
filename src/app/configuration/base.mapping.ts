import {UtilityMapping} from './utility.mapping';

export class BaseMapping {
  public static response: object = {
    success: 'success',
    result: 'result',
  };
}

/**
 * sistema di rimapattura classi per le chiamate.
 * https://www.npmjs.com/package/object-mapper
 */
export class ClassMapping {
  public static find(key: string): object {
    let rt = null;
    if (!key) {
      throw new Error('Not found Map');
    }

    switch (key.toUpperCase()) {
      case 'BASE_STATUS':
        rt = UtilityMapping.BASE_STATUS;
        break;
      case 'BASE_IMAGE':
        rt = UtilityMapping.BASE_IMAGE;
        break;

      default:
        throw new Error('Not found Map');
    }
    return rt;
  }
}
