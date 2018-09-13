package models

import play.api.libs.json._

case class Order(id: Long, userId: String, basketId: Long, payment_id: Long)

object Order {
  implicit val orderFormat = Json.format[Order]
}
