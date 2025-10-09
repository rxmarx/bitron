export default function InstanceOf<T>(obj: any, key: keyof T): obj is T {
  return key in obj;
}
