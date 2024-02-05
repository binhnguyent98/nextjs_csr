import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { camelCase, isObject } from 'lodash';

export const convertDataToInstance = <T extends object>(data = {}, instance: T): T => {
  Object.assign(instance, data);

  return data as T;
};

export function instanceToCamelCase<T extends object | []>(instance: T) {
  if (!instance && typeof instance !== 'object') {
    return instance;
  }

  if (isObject(instance) && !Array.isArray(instance)) {
    const objInstance = Object.fromEntries(
      Object.entries(instance).map(([key, val]) => [camelCase(key), typeof val === 'object' ? instanceToCamelCase(val) : val])
    ) as T;

    return objInstance;
  } else {
    const instanceArray = instance?.map((item) => (typeof item === 'object' ? instanceToCamelCase(item) : item)) as T;

    return instanceArray;
  }
}

export function formToInstance<TInstance>({ data, instance }: { data: unknown; instance: ClassConstructor<TInstance> }) {
  const plain = instanceToPlain(data);
  const result = plainToInstance(instance, plain);

  return result;
}
