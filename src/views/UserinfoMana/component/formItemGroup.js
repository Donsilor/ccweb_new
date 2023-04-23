import * as FormItems from './formItem';
export default function userinfoFormGroup(path) {
  let group = [];
  switch (path) {
    case '/dealerList':
      group = [FormItems.distributorName, FormItems.status, FormItems.税控监管, FormItems.特殊经销商];
      break;
    case '/ewList':
      group = [FormItems.ewName, FormItems.auditStatus];
      break;
    default:
      break;
  }
  return group;
}
