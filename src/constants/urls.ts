export class Urls{
  static readonly apiUrl:string = "http://localhost:3000";
  static readonly prodApiUrl:string = "http://localhost:5000";

  static readonly auth:string = "/auth";
  static readonly login:string = "/login";

  static readonly readings:string = "/readings";
  static readonly getDevices:string = "/get_devices";
  static readonly getTemperaturesByDevice:string = "/get_temperatures_by_device";
  static readonly getHumiditiesByDevice:string = "/get_humidities_by_device";

}
