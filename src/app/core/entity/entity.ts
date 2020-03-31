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
  time: string;
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
  time: string;
  bench: Bench;
}

export class Bench {
  id: number;
  number: string;
  description: string;
  workshop: string;
}
