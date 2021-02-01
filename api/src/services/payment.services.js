// eslint-disable
// Model
const Payment = require('../models/payment.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')

// Mailer
const mailer = require('../utils/nodemail')

// Config
const {config} = require('../config/config')
//= ====================================================================================================================

const removeHistory = async (email, price, id, bonus) => {
  const query = {email}

  try {
    const user = await User.findOne(query)
    if (!user) { throw 'User not found' }

    const userHistory = user.history.filter(history => history.timeStamp !== id)

    if (user.refer) { if (!bonus) { await removeBonus(user.refer, price) } }

    const obj = {
      history: userHistory,
      bonus: bonus ? user.bonus + price : user.bonus
    }

    await User.findOneAndUpdate(query, obj, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

const removeBonus = async (referral, price) => {
  const percent = 10 // TODO: Получить с бд процент
  const query = {referralCode: referral}

  try {
    const user = await User.findOne(query)
    if (!user) { throw 'User not found' }

    const bonus = user.bonus - ((price / 100) * percent)
    await User.findOneAndUpdate(query, {bonus}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

const isRefer = async (refer, price) => {
  const percent = 10 // TODO: Получить с бд процент
  const query = {referralCode: refer}

  try {
    const user = await User.findOne(query)
    if (!user) { throw 'User not found' }

    const bonus = user.bonus + ((price / 100) * percent)
    await User.findOneAndUpdate(query, {bonus}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

const isLogin = async (email, history, bonus, total) => {
  const query = {email}

  try {
    const user = await User.findOne(query)
    if (!user) { throw 'User not found' }

    const userHistory = user.history
    userHistory.unshift(history)

    const obj = {
      history: userHistory,
      bonus: bonus ? user.bonus - total : user.bonus
    }

    await User.findOneAndUpdate(query, obj, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

const addPopularity = async (_id) => {
  const query = {_id}

  try {
    const product = await Product.findOne(query)
    if (!product) { throw 'Product not found' }

    const popularity = product.popularity + 1
    await Product.findOneAndUpdate(query, {popularity}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

const sendMail = (body, price, info, dontCall, email, shipping) => {
  const adminMail = 'priymak615@gmail.com' // TODO: Получить email с бд

  const attachments = []
  body.map((product, index) => attachments.push({
    filename: product.thumb.split('/')[2],
    path: config.link + product.thumb,
    cid: `image${index}`
  }))

  const list = []
  body.map((product, index) => list.push(`
    <li style="position: relative; display: flex; margin-bottom: 15px;">

        <div style="display: flex; align-items: flex-start; width: 100%">

            <img style="width: 70px; height: 75px; border: 1px solid rgba(255, 255, 255, 0.2); margin-right: 15px;
                        object-fit: cover;" src="cid:image${index}" alt="">

            <div>
                <a style="color: #fff; text-decoration: none; font-size: 14px; letter-spacing: 0.933333px;
                          text-transform: uppercase; display: block; transition: opacity 0.3s 0s; padding: 5px 0 15px;"
                          href="${config.link}/shop${product.name.split(' ').join('-')}">${product.name}</a>

                <p style="font-weight: bold; font-size: 14px; line-height: 14px;">Колл: ${product.pack}</p>
            </div>

        </div>

        <div style="font-weight: bold; font-size: 14px; line-height: 30px; white-space: nowrap;">
            <b>${product.pack * product.price.uah} грн / ${product.pack * product.price.usd}$</b>
        </div>
    </li>`))

  try {
    const message = {
      to: adminMail,
      subject: 'Новый заказ',
      attachments,
      html: `

        <div style="color: #fff;background: #272831;padding: 100px 20px;">

          <h2 style="padding: 0 0 15px">Поступил новый заказ</h2>

          <ul style="list-style: none; padding: 30px 0;
                     border-top: 1px solid rgba(255, 255, 255, 0.2);
                     border-bottom: 1px solid rgba(255, 255, 255, 0.2);">

            ${list.join(' ')}
          </ul>

          <h3>Контактные данные</h3>

          <p style="margin: 10px 0;">Телефон: <b>${info.phone}</b></p>
          <p style="margin: 10px 0;">Почта: <b>${info.email}</b></p>
          <p style="margin: 10px 0;">Адресс: <b>${info.country} ${info.city} ${info.stateProvince} ${info.address} ${info.apartment}</b></p>

          ${dontCall ? '<p style="font-size: 17px; font-weight: bold; margin-top: 15px;">Пользователь просил не перезванивать</p>' : ''}

          <p style="float: right; font-size: 16px;">Итого: <b>${price.uah} грн / ${price.usd}$</b></p>

        </div>
      `
    }

    const userMessage = {
      to: email,
      subject: 'Вы сделали заказ',
      attachments,
      html: `

        <div style="color: #fff; background: #272831; padding: 100px 20px;">

          <header style="display: flex; align-items: center; margin-bottom: 40px;">
            <a style="display: block; opacity: .9; color: #fff; font-size: 16px; transition: opacity 0.3s 0s;
                      margin-right: 40px; text-decoration: none" href="${config.link}">
              ${config.link}
            </a>

            <nav>
                <ol style="display: flex; align-items: center; list-style: none; padding: 0; margin: 0;">

                    <li style="padding-left: 30px; margin-bottom: 0;">
                        <a style="opacity: 0.8; font-weight: 500; font-size: 17px; line-height: 18px; position: relative;
                                  transition: opacity 0.3s 0s; color: #fff; text-decoration: none;"
                                  href="${config.link}/shop">Магазин</a>
                    </li>

                    <li style="padding-left: 30px; margin-bottom: 0;">
                        <a style="opacity: 0.8; font-weight: 500;  font-size: 17px; line-height: 18px; position: relative;
                                  transition: opacity 0.3s 0s; color: #fff; text-decoration: none;"
                                  href="${config.link}/blog">Блог</a>
                    </li>

                </ol>
            </nav>
          </header>

          <h2 style="padding: 0 0 15px">Вы сделали заказ</h2>

          <ul style="list-style: none; padding: 30px 0;
                     border-top: 1px solid rgba(255, 255, 255, 0.2);
                     border-bottom: 1px solid rgba(255, 255, 255, 0.2);">

            ${list.join(' ')}
          </ul>

          <h3>Доставка</h3>

          <p style="margin: 10px 0;">Доставка: <b>${shipping}</b></p>
          <p style="margin: 10px 0;">Адресс: <b>${info.country} ${info.city} ${info.stateProvince} ${info.address} ${info.apartment}</b></p>

          ${!dontCall
              ? '<p style="font-size: 17px; font-weight: bold; margin-top: 15px;">Ожидайте звонка менеджера</p>'
              : '<p style="font-size: 17px; font-weight: bold; margin-top: 15px;">Ожидайте письма от менеджера</p>'}

          <p style="float: right; font-size: 16px;">Итого: <b>${price.uah} грн / ${price.usd}$</b></p>

      <div>`
    }

    mailer(message)
    mailer(userMessage)
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Create Payment
exports.createPayment = async function (payment, refer, email) {
  const price = payment.price.subtotal.usd
  const paymentBonus = payment.price.payment === 'referral_bonus'

  const timeStamp = Date.now()

  // Creating a new Mongoose Object by using the new keyword
  const newPayment = new Payment({
    shipping: payment.shipping,
    body: payment.body,
    dontCall: payment.dontCall,
    account: payment.account,
    price: {
      currency: payment.price.currency,
      payment: payment.price.payment,
      coupon: payment.price.coupon,
      subtotal: payment.price.subtotal,
      shipping: payment.price.shipping,
      total: payment.price.total
    },
    info: {
      firstName: payment.info.firstName,
      lastName: payment.info.lastName,
      country: payment.info.country,
      city: payment.info.city,
      stateProvince: payment.info.stateProvince,
      address: payment.info.address,
      apartment: payment.info.apartment,
      zipCode: payment.info.zipCode,
      email: payment.info.email,
      phone: payment.info.phone
    },
    timeStamp
  })

  try {
    if (refer) { if (!paymentBonus) { await isRefer(refer, price) } }

    if (email) {
      const history = {
        timeStamp,
        total: payment.price.subtotal,
        products: payment.body
      }

      await isLogin(email, history, paymentBonus, payment.price.total.usd)
    }

    sendMail(payment.body, payment.price.total, payment.info, payment.dontCall, payment.info.email, payment.shipping)
    payment.body.map(product => addPopularity(product.id))

    // Saving the Payment
    await newPayment.save()
  } catch (err) {
    // return a Error
    throw err
  }
}

// Get Payments
exports.getPayments = async function () {
  try {
    let _detail = await Payment.find()

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Get Payment
exports.getPayment = async function (_id) {
  try {
    let _detail = await Payment.findOne({_id})
    if (!_detail) { throw 'Payment not Found' }

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Change Status Payment
exports.changeStatusPayment = async function (_id, status) {
  try {
    let _detail = await Payment.findOne({_id})
    if (!_detail) { throw 'Payment not Found' }

    await Payment.findOneAndUpdate({_id}, {status}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.removeRevokePayment = async function (_id, action) {
  // Delete or Revoke
  try {
    let _detail = await Payment.findOne({_id})
    if (!_detail) { throw 'Payment not Found' }
    const email = _detail.account
    const price = _detail.price.subtotal.usd
    const id = _detail.timeStamp
    const paymentBonus = _detail.price.payment === 'referral_bonus'

    if (action === 'revoke') {
      await Payment.findOneAndUpdate({_id}, {status: 'Отменен'}, {returnOriginal: false})
    } else if (action === 'remove') {
      const deleted = await Payment.deleteOne({_id})
      if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete payment' }
    }

    if (email) { await removeHistory(email, price, id, paymentBonus) }
  } catch (err) {
    throw err
  }
}
