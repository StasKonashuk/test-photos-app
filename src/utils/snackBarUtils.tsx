import React from 'react';
import { useSnackbar, VariantType, ProviderContext } from 'notistack';

interface SnackBarProps {
  setUseSnackbarRef: (showSnackbar: ProviderContext) => void;
}

function InnerSnackbarUtilsConfigurator({ setUseSnackbarRef }: SnackBarProps) {
  setUseSnackbarRef(useSnackbar());
  return null;
}

let useSnackbarRef: ProviderContext;

const setUseSnackbarRef = (useSnackbarRefProp: ProviderContext) => {
  useSnackbarRef = useSnackbarRefProp;
};

export function SnackbarUtilsConfigurator() {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />;
}

export const snackActions = {
  success(msg: string) {
    this.toast(msg, 'success');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};
