export const convertToOptionData = <T extends object>(data: T[], mappingKey: { label: string; value: string }) => {
  return data?.map((item) => ({ label: item[mappingKey.label as keyof T], value: item[mappingKey.value as keyof T] }));
};
