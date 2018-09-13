package models

import play.api.libs.json._

case class Order(id: Long, userId: String, basketId: Long, payment_id: Long)

case class OrderResult(id: Long, userId: String, products: Seq[BasketProductWithName], totalPrice: Int)

object Order {
  implicit val orderFormat = Json.format[Order]
}

object OrderResult {
  implicit val orderFormat = Json.format[OrderResult]
}
