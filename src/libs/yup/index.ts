import { Translate } from 'next-translate';
import * as YupRoot from 'yup';

import { arRules } from './array';
import { numberRules } from './number';
import { objRules } from './object';
import { strRules } from './string';

const rules: Record<string, Record<string, (props: ParamFnProps) => ResultParamFnProps>> = {
  string: strRules,
  number: numberRules,
  object: objRules,
  array: arRules,
};

export type ParamFnProps = {
  field?: string;
  messages?: string;
  t?: Translate;
};

export type ResultParamFnProps = {
  message: string;
  callBack: <T>(value?: T) => boolean;
};

declare module 'yup' {
  interface StringSchema {
    isHalfSize(props?: ParamFnProps & { t: Translate }): this;
    isRequired(props?: ParamFnProps & { t: Translate }): this;
  }
}

const yup = () => {
  const schema = { ...YupRoot };

  Object.keys(rules).forEach((key) => {
    if (Object.keys(rules[key])?.length) {
      Object.keys(rules[key]).forEach((nameRule) => {
        switch (key) {
          case 'string':
            schema.addMethod<YupRoot.StringSchema>(YupRoot.string, nameRule, function (props: ParamFnProps) {
              const result = rules[key][nameRule]({ ...props });
              const { message, callBack } = result;

              return this.test(nameRule, message, function (value) {
                return callBack(value);
              });
            });
            break;

          case 'number':
            schema.addMethod<YupRoot.NumberSchema>(YupRoot.number, nameRule, function (props: ParamFnProps) {
              const result = rules[key][nameRule]({ ...props });
              const { message, callBack } = result;

              return this.test(nameRule, message, function (value) {
                return callBack(value);
              });
            });
            break;
        }
      });
    }
  });

  return schema;
};

// eslint-disable-next-line import/no-default-export
export default yup();
