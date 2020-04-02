export class Response {
  data: any;
  msg: string;
  state: any;
}

export class SoftwareUpgrade {
  id: number;
  description: string;
  time: string;
}

export class Warning {
  id: number;
  time: Date;
  // tslint:disable-next-line:variable-name
  machine_signal0: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal1: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal2: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal3: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal4: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal5: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal6: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal7: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal8: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal9: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal10: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal11: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal12: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal13: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal14: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal15: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal16: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal17: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal18: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal19: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal20: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal21: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal22: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal23: boolean;
  // tslint:disable-next-line:variable-name
  machine_signal24: boolean;
}

export class BenchData {
  id: number;
  number: string;
  time: Date;
  bench: Bench;
}

export class Bench {
  id: number;
  number: string;
  description: string;
  workshop: string;
}

export class ProcessData {
  id: number;
  // tslint:disable-next-line:variable-name
  concrete_density: number;
  // tslint:disable-next-line:variable-name
  concrete_angle: number;
  // tslint:disable-next-line:variable-name
  concrete_thickness: number;
  // tslint:disable-next-line:variable-name
  concrete_delay: number;
  // tslint:disable-next-line:variable-name
  zero_X: number;
  // tslint:disable-next-line:variable-name
  zero_Y: number;
  // tslint:disable-next-line:variable-name
  zero_Z: number;
  // tslint:disable-next-line:variable-name
  concretrreceive_coordinate_x: number;
  // tslint:disable-next-line:variable-name
  concretrreceive_coordinate_y: number;
  // tslint:disable-next-line:variable-name
  concretrreceive_coordinate_z: number;
  // tslint:disable-next-line:variable-name
  crop_width_y: number;
  // tslint:disable-next-line:variable-name
  crop_height_x: number;
  // tslint:disable-next-line:variable-name
  crop_X_notpositive_distance: number;
  enddistance: number;
  bench: Bench;
}

export class RobotData {
  id: number;
  // tslint:disable-next-line:variable-name
  concrete_density: number;
  // tslint:disable-next-line:variable-name
  concrete_angle: number;
  // tslint:disable-next-line:variable-name
  concrete_thickness: number;
  // tslint:disable-next-line:variable-name
  concrete_delay: number;
  // tslint:disable-next-line:variable-name
  maxv_x: number;
  // tslint:disable-next-line:variable-name
  maxv_y: number;
  // tslint:disable-next-line:variable-name
  maxv_z: number;
  // tslint:disable-next-line:variable-name
  maxv_part: number;
  // tslint:disable-next-line:variable-name
  encodervalue_zero_X: number;
  // tslint:disable-next-line:variable-name
  encodervalue_zero_Y: number;
  // tslint:disable-next-line:variable-name
  encodervalue_zero_Z: number;
  // tslint:disable-next-line:variable-name
  mincoordinate_x: number;
  // tslint:disable-next-line:variable-name
  mincoordinate_y: number;
  // tslint:disable-next-line:variable-name
  mincoordinate_z: number;
  // tslint:disable-next-line:variable-name
  maxcoordinate_x: number;
  // tslint:disable-next-line:variable-name
  maxcoordinate_y: number;
  // tslint:disable-next-line:variable-name
  maxcoordinate_z: number;
  // tslint:disable-next-line:variable-name
  concretrreceive_coordinate_x: number;
  // tslint:disable-next-line:variable-name
  concretrreceive_coordinate_y: number;
  // tslint:disable-next-line:variable-name
  concretrreceive_coordinate_z: number;
  // tslint:disable-next-line:variable-name
  vibrate_time: number;
  // tslint:disable-next-line:variable-name
  vibration_frequency_1: number;
  // tslint:disable-next-line:variable-name
  speed_default: number;
  // tslint:disable-next-line:variable-name
  target_work_port_v: number;
  // tslint:disable-next-line:variable-name
  move_speed: number;
  // tslint:disable-next-line:variable-name
  crop_height_x: number;
  // tslint:disable-next-line:variable-name
  crop_width_y: number;
  // tslint:disable-next-line:variable-name
  crop_X_notpositive_distance: number;
  // tslint:disable-next-line:variable-name
  port_work_distance_x: number;
  // tslint:disable-next-line:variable-name
  port_work_distance_y: number;
  // tslint:disable-next-line:variable-name
  reversedweight_length: number;
  // tslint:disable-next-line:variable-name
  reversedweight_lengthpositive: number;
  // tslint:disable-next-line:variable-name
  time_lubrication: number;
  // tslint:disable-next-line:variable-name
  Intervals_lubrication: number;
  // tslint:disable-next-line:variable-name
  vibrate_outputs0: boolean;
  // tslint:disable-next-line:variable-name
  vibrate_outputs1: boolean;
  // tslint:disable-next-line:variable-name
  vibrate_outputs2: boolean;
  // tslint:disable-next-line:variable-name
  vibrate_outputs3: boolean;
  enddistance: number;
  // robot: Robot;
}
