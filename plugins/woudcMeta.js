export default (context, inject) => {
  inject('titleTemplate', (woudc, woudcFull) => `%s - ${woudc} - ${woudcFull}`)
}
