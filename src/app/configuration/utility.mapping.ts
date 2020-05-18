
export class UtilityMapping {

  public static BASE_IMAGE = {
    url: 'url',
  };

  public static BASE_STATUS = {
    status: 'status',
  };

  public static ACTION = {
    id: '[].id',
    description: '[].description',
  };

  public static TAXES = {
    id_product: '[].id_product',
    id_state: '[].id_state',
    value: '[].value'
  };

  public static ADMIN = {
    id: 'id',
    cognito_id: 'cognito_id',
    name: 'name',
    surname: 'surname',
    email: 'email',
    account_type: 'account_type'
  };

  public static USER = {
    cognito_id: 'cognito_id',
    id: 'id',
    email: 'email',
    name: 'name',
    surname: 'surname',
    birth_date: 'birth_date',
    phone_prefix: 'phone_prefix',
    gender: 'gender',
    phone: 'phone',
    flag_privacy: 'flag_privacy',
    flag_commercial: 'flag_commercial'
  };

}
