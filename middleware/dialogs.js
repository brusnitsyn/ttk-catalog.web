export default function ({ store }) {
  // If mobile menu opened
  if (store.state.ui.isMobileMenuShow) {
    store.dispatch('ui/switchMobileMenuShow')
  }

  // If search dialog opened
  if (store.state.ui.isSearchDialogShow) {
    store.dispatch('ui/switchSearchDialogShow')
  }
}
