export default function ({redirect, app}) {
  const data = app.$cookies.get('referral')

  if (data) { return redirect('/referral/link') }
}
