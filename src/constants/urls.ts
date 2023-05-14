export class Urls{
  static readonly apiUrl:string = "http://localhost:3000";
  static readonly prodApiUrl:string = "http://localhost:5000";

  static readonly auth:string = "/auth";
  static readonly login:string = "/login";

  static readonly forgotPassword:string = "/forgot_password";
  static readonly checkCode:string = "/check_code";
  static readonly changePassword:string = "/change_password";

  static readonly readings:string = "/readings";
  static readonly getDevices:string = "/get_devices";
  static readonly getTemperaturesByDevice:string = "/get_temperatures_by_device";
  static readonly getHumiditiesByDevice:string = "/get_humidities_by_device";

  static readonly motions:string = "/motions";
  static readonly getMotionDevices:string = "/get_motion_devices";
  static readonly getAllMotions:string = "/get_all_motions";
  static readonly getAllMotionsByDevice:string = "/get_all_motions_by_device";
  static readonly getAllMotionSensorStatistics:string = "/get_all_motion_sensor_statistics";

  static readonly userNotifications:string = "/user_notifications";
  static readonly getAllDetailsByEmail:string = "/get_all_details_by_email";
  static readonly updateUserNotificationOptions:string = "/update";
}
